<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support;

use InvalidArgumentException;
use Nuxtifyts\Lumen\Support\ClassVarianceAuthorityConfig\CompoundVariant;
use Nuxtifyts\Lumen\Support\ClassVarianceAuthorityConfig\VariantConfig;

abstract class ClassVarianceAuthority
{
    /**
     * @var list<string>
     */
    protected array $baseClasses;

    protected ClassVarianceAuthorityConfig $config;

    final public function __construct(mixed ...$args)
    {
        $baseClassesArg = $args[0] ?? $args['baseClasses'] ?? null;
        $configArg = $args[1] ?? $args['config'] ?? null;

        if (null === $baseClassesArg || ! is_string($baseClassesArg) && ! is_array($baseClassesArg)) {
            throw new InvalidArgumentException('The provided "baseClasses" key is incorrect.');
        }

        if (null === $configArg || ! is_array($configArg)) {
            throw new InvalidArgumentException('The provided "config" key is incorrect.');
        }

        $this->baseClasses = is_array($baseClassesArg) ? $baseClassesArg : [$baseClassesArg];
        $this->config = ClassVarianceAuthorityConfig::fromArray($configArg);
    }

    /**
     * @param  ?string  ...$props  (Group identifier => Variant identifier)
     */
    public function __invoke(?string ...$props): ClassBuilder
    {
        // Get the applied variants from the props & use default variants if needed
        $appliedVariants = $this->config
            ->getDefaultVariants()
            ->merge(collect($props)->filter()->map($this->config->getVariantConfig(...))->filter())
            ->unique('group')
            ->keyBy('group');

        $compoundVariants = $this->config->getCompoundVariants()
            ->filter(static fn (CompoundVariant $compoundVariant): bool => $compoundVariant->shouldBeApplied($appliedVariants));

        return app('lumen')
            ->classes($this->baseClasses)
            ->add($appliedVariants->map(static::resolveClasses(...))->values())
            ->add($compoundVariants->map(static::resolveClasses(...))->values());
    }

    final protected static function resolveClasses(VariantConfig|CompoundVariant $variant): string
    {
        return is_array($variant->classes) ? implode(' ', $variant->classes) : $variant->classes;
    }
}

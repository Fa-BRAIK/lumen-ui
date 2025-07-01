<?php

declare(strict_types=1);

namespace Lumen\Support\ClassVarianceAuthorityConfig;

use Illuminate\Support\Collection;
use InvalidArgumentException;

final readonly class VariantConfigGroup
{
    /**
     * @var Collection<string, VariantConfig>
     */
    private Collection $variants;

    /**
     * @param  array<array-key, VariantConfig>  $variants
     */
    private function __construct(
        public string $identifier,
        array $variants,
    ) {
        $this->variants = collect($variants)->keyBy('identifier');
    }

    /**
     * @param  array<array-key, VariantConfig>  $variants
     */
    public static function make(string $identifier, array $variants): static
    {
        return new self($identifier, $variants);
    }

    /**
     * @param  array<string, mixed>  $config
     * @return array<string, self>
     */
    public static function collectFromArray(array $config): array
    {
        $variants = [];

        foreach ($config as $groupIdentifier => $group) {
            if ( ! is_array($group) || is_numeric($groupIdentifier)) {
                throw new InvalidArgumentException('The provided "variants" key is incorrect.');
            }

            $variantConfigGroup = VariantConfigGroup::make($groupIdentifier, []);

            foreach ($group as $variantIdentifier => $classes) {
                if ( ! is_array($classes) && ! is_string($classes) || ! is_string($variantIdentifier)) {
                    throw new InvalidArgumentException('The provided "variants" key is incorrect.');
                }

                $variantConfigGroup->add(new VariantConfig($variantIdentifier, $groupIdentifier, $classes));
            }

            $variants[$groupIdentifier] = $variantConfigGroup;
        }

        return $variants;
    }

    /**
     * @desc Adds a variant to the collection. Ignores the variant if it does not belong to the group.
     */
    public function add(VariantConfig ...$variants): self
    {
        foreach ($variants as $variant) {
            if ($this->acceptsVariantConfig($variant)) {
                $this->variants->put($variant->identifier, $variant);
            }
        }

        return $this;
    }

    public function get(string $identifier): ?VariantConfig
    {
        return $this->variants->get($identifier);
    }

    private function acceptsVariantConfig(VariantConfig $variantConfig): bool
    {
        return $variantConfig->group === $this->identifier;
    }
}

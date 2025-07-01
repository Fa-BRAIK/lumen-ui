<?php

declare(strict_types=1);

namespace Lumen\Support;

use Illuminate\Support\Collection;
use InvalidArgumentException;
use Lumen\Support\ClassVarianceAuthorityConfig\CompoundVariant;
use Lumen\Support\ClassVarianceAuthorityConfig\VariantConfig;
use Lumen\Support\ClassVarianceAuthorityConfig\VariantConfigGroup;

final readonly class ClassVarianceAuthorityConfig
{
    /**
     * @var Collection<string, VariantConfigGroup>
     *
     * Associated by group name: `VariantConfigGroup::identifier` && `VariantConfig::group`
     */
    private Collection $variantGroups;

    /**
     * @var Collection<int, CompoundVariant>
     */
    private Collection $compoundVariants;

    /**
     * @var Collection<string, VariantConfig>
     *
     * Associated by `VariantConfig::group`
     */
    private Collection $defaultVariants;

    /**
     * @param  array<string, VariantConfigGroup>  $variantGroups
     * @param  list<CompoundVariant>  $compoundVariants
     * @param  array<string, VariantConfig>  $defaultVariants
     */
    public function __construct(array $variantGroups, array $compoundVariants, array $defaultVariants)
    {
        $this->variantGroups = collect($variantGroups)->keyBy('identifier');
        $this->compoundVariants = collect($compoundVariants);
        $this->defaultVariants = collect($defaultVariants)->keyBy('group');
    }

    /**
     * @param  array{
     *  variants?: array<string, mixed>,
     *  compoundVariants?: list<array<string, mixed>>,
     *  defaultVariants?: array<string, mixed>
     * } $config
     */
    public static function fromArray(array $config): self
    {
        $variants = is_array($variantsData = $config['variants'] ?? null)
            ? VariantConfigGroup::collectFromArray($variantsData)
            : throw new InvalidArgumentException('The provided "variants" key is incorrect.');

        $compoundVariants = (is_array($compoundVariantsData = $config['compoundVariants'] ?? null) || empty($config['compoundVariants']))
            ? CompoundVariant::collectFromArray($compoundVariantsData ?? [], $variants)
            : throw new InvalidArgumentException('The provided "compoundVariants" key is incorrect.');

        $defaultVariants = [];

        if ( ! is_array($defaultVariantsData = $config['defaultVariants'] ?? null) && ! empty($config['defaultVariants'])) {
            throw new InvalidArgumentException('The provided "defaultVariants" key is incorrect.');
        }

        foreach ($defaultVariantsData ?? [] as $group => $identifier) {
            if ( ! is_string($identifier) || ! array_key_exists($group, $variants)) {
                throw new InvalidArgumentException('The provided "defaultVariants" key is incorrect. (1)');
            }

            /**
             * @var ?VariantConfig
             */
            $variantConfig = $variants[$group]->get($identifier);

            if ( ! $variantConfig) {
                throw new InvalidArgumentException('The provided "defaultVariants" key is incorrect. (2)');
            }

            $defaultVariants[$group] = $variantConfig;
        }

        return new self($variants, $compoundVariants, $defaultVariants);
    }

    public function getVariantConfig(string $variantIdentifier, string $groupIdentifier): ?VariantConfig
    {
        return $this->variantGroups->get($groupIdentifier)?->get($variantIdentifier);
    }

    /**
     * @return Collection<string, VariantConfig>
     */
    public function getDefaultVariants(): Collection
    {
        return collect($this->defaultVariants->all());
    }

    /**
     * @return Collection<int, CompoundVariant>
     */
    public function getCompoundVariants(): Collection
    {
        return collect($this->compoundVariants->all());
    }
}

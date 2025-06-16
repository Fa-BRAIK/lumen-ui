<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support\ClassVarianceAuthorityConfig;

use Illuminate\Support\Collection;
use InvalidArgumentException;

final readonly class CompoundVariant
{
    /**
     * @var Collection<int, VariantConfig>
     */
    private Collection $variants;

    /**
     * @param  array<array-key, VariantConfig>  $variants
     */
    public function __construct(
        array $variants,

        /**
         * @var string|list<string>
         */
        public string|array $classes,
    ) {
        $this->variants = collect($variants);
    }

    /**
     * @param  array<string, mixed>  $data
     * @param  array<string, VariantConfigGroup>  $variantGroups
     */
    public static function fromArray(array $data, array $variantGroups): self
    {
        $variantConfigs = [];
        $classes = $data['classes'] ?? null;

        if ( ! is_array($classes) && ! is_string($classes)) {
            throw new InvalidArgumentException('The provided "compoundVariants" key is incorrect. (1)');
        }

        foreach ($data as $group => $identifier) {
            if ('classes' === $group) {
                continue;
            }

            if ( ! is_string($identifier) || ! array_key_exists($group, $variantGroups)) {
                throw new InvalidArgumentException('The provided "compoundVariants" key is incorrect. (2)');
            }

            $variantConfig = $variantGroups[$group]->get($identifier);

            if ( ! $variantConfig) {
                throw new InvalidArgumentException('The provided "compoundVariants" key is incorrect. (3)');
            }

            $variantConfigs[] = $variantConfig;
        }

        return new CompoundVariant($variantConfigs, $classes);
    }

    /**
     * @param  list<mixed>  $data
     * @param  array<string, VariantConfigGroup>  $variantGroups
     * @return list<self>
     */
    public static function collectFromArray(array $data, array $variantGroups): array
    {
        $compoundVariants = [];

        foreach ($data as $compoundVariantData) {
            if ( ! is_array($compoundVariantData)) {
                throw new InvalidArgumentException('The provided "compoundVariants" key is incorrect.');
            }

            $compoundVariants[] = self::fromArray($compoundVariantData, $variantGroups);
        }

        return $compoundVariants;
    }

    /**
     * @param  Collection<array-key, VariantConfig>  $variants
     */
    public function shouldBeApplied(Collection $variants): bool
    {
        return $this->variants->every(
            static fn (VariantConfig $compoundVariant): bool => (bool) $variants->first(
                static fn (VariantConfig $variant) => $variant->identifier === $compoundVariant->identifier
                    && $variant->group === $compoundVariant->group,
            ),
        );
    }
}

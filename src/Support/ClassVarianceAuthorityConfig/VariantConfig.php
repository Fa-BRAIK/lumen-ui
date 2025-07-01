<?php

declare(strict_types=1);

namespace Lumen\Support\ClassVarianceAuthorityConfig;

final readonly class VariantConfig
{
    public function __construct(
        /**
         * @var string Name of the variant, ie. "primary", "secondary", "medium", etc.
         */
        public string $identifier,

        /**
         * @var string Group identifier of the variant, ie. "variant", "size", "color", etc.
         */
        public string $group,

        /**
         * @var string|list<string>
         */
        public string|array $classes,
    ) {}
}

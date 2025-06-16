<?php

use Nuxtifyts\Lumen\Support\ClassVarianceAuthority;

covers(ClassVarianceAuthority::class);

it('will resolve basic class variants', function (
    string|array $baseClasses,
    array $config,
    array $invokeArgs,
    string $expected,
) {
    $componentVariance = new class(baseClasses: $baseClasses, config: $config) extends ClassVarianceAuthority {};

    expect((string) $componentVariance(...$invokeArgs))->toBe($expected);
})->with(function () {
    $componentConfig = [
        'variants' => [
            'intent' => [
                'primary' => 'bg-primary text-white',
                'accent' => 'bg-accent text-white',
                'ghost' => 'bg-transparent text-accent',
            ],
            'size' => [
                'xs' => 'text-sm',
                'sm' => 'text-sm',
                'md' => 'text-md',
            ],
            'disabled' => [
                'true' => 'cursor-not-allowed',
                'false' => 'cursor-pointer',
            ],
        ],
        'compoundVariants' => [
            [
                'intent' => 'accent',
                'size' => 'sm',
                'classes' => 'bg-accent text-white text-sm',
            ],
            [
                'intent' => 'primary',
                'size' => 'xs',
                'classes' => 'bg-primary text-white text-sm',
            ],
            [
                'disabled' => 'true',
                'intent' => 'primary',
                'classes' => 'bg-primary text-white',
            ],
        ],
        'defaultVariants' => [
            'intent' => 'accent',
            'size' => 'md',
        ],
    ];

    return [
        'will_use_default_variants' => [
            'baseClasses' => '',
            'config' => $componentConfig,
            'invokeArgs' => [],
            'expected' => 'bg-accent text-white text-md',
        ],
        'will_use_default_variants_if_null_is_given' => [
            'baseClasses' => '',
            'config' => $componentConfig,
            'invokeArgs' => ['intent' => null, 'size' => 'sm'],
            'expected' => 'bg-accent text-white text-sm',
        ],
        'will_use_selected_variants' => [
            'baseClasses' => '',
            'config' => $componentConfig,
            'invokeArgs' => ['intent' => 'primary', 'size' => 'xs'],
            'expected' => 'bg-primary text-white text-sm',
        ],
        'will_use_base_classes' => [
            'baseClasses' => 'text-red-500',
            'config' => $componentConfig,
            'invokeArgs' => ['intent' => 'primary', 'size' => 'xs'],
            'expected' => 'text-red-500 bg-primary text-white text-sm',
        ],
        'will_use_compound_variants' => [
            'baseClasses' => '',
            'config' => $componentConfig,
            'invokeArgs' => ['intent' => 'accent', 'size' => 'sm'],
            'expected' => 'bg-accent text-white text-sm',
        ],
        'will_use_compound_variants_with_base_classes' => [
            'baseClasses' => 'text-red-500',
            'config' => $componentConfig,
            'invokeArgs' => ['intent' => 'accent', 'size' => 'sm'],
            'expected' => 'text-red-500 bg-accent text-white text-sm',
        ],
        'will_use_compound_variants_with_disabled' => [
            'baseClasses' => '',
            'config' => $componentConfig,
            'invokeArgs' => ['intent' => 'primary', 'disabled' => 'true'],
            'expected' => 'bg-primary text-white text-md cursor-not-allowed',
        ],
    ];
});

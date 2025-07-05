@use('Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => 'div',
    'orientation' => 'horizontal',
    'options' => [
        'direction' => 'ltr',
        'loop' => false,
    ],
    'pluginsObjectName' => '__carouselPlugins',
    'pluginNames' => [],
])

@php(throw_unless(
    ! array_key_exists('orientation', $options),
    InvalidComponentException::invalidCarouselOrientationOption('The "orientation" option can not be passed from the "options" array. Instead, use the "orientation" prop directly.')
))

@php($attributes = $attributes
    ->twMerge('relative')
    ->merge([
        'as' => $as,
        'role' => 'region',
        'data-slot' => 'carousel',
        'aria-roledescription' => __('Carousel'),
        'x-carousel' => Js::from([
            ...$options,
            'orientation' => $orientation,
            'direction' => $options['direction'] ?? 'ltr',
            'loop' => $options['loop'] ?? false,
            'pluginsObjectName' => $pluginsObjectName,
            'pluginNames' => $pluginNames
        ])
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

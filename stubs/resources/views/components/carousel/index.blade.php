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

@php($componentParams = Js::from([
    ...$options,
    'orientation' => $orientation,
    'direction' => $options['direction'] ?? 'ltr',
    'loop' => $options['loop'] ?? false,
    'pluginsObjectName' => $pluginsObjectName,
    'pluginNames' => $pluginNames
]))

@php($attributes = $attributes
    ->twMerge('relative')
    ->merge([
        'as' => $as,
        'role' => 'region',
        'data-slot' => 'carousel',
        'aria-roledescription' => __('Carousel'),
        'x-data' => "carousel($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

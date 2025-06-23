@props([
    'as' => 'div',
    'asChild' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'asChild' => $asChild,
        'data-slot' => 'tooltip-trigger',
        'x-tooltip:trigger' => ''
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'button',
    'type' => 'button',
    'asChild' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'asChild' => $asChild,
        'data-slot' => 'collapsible-trigger',
        'x-data' => 'collapsibleTrigger',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

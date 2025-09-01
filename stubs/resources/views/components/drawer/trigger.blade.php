@props([
    'as' => 'div',
    'asChild' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'asChild' => $asChild,
        'data-slot' => 'drawer-trigger',
        'x-data' => 'drawerTrigger',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

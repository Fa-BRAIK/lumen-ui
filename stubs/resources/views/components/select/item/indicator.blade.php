@props([
    'as' => 'span'
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'select-item-indicator',
        'x-select:item-indicator' => '',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

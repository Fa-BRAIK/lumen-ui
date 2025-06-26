@props([
    'as' => 'span'
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'select-item-text',
        'x-select:item-text' => ''
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>
@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'select-group',
        'role' => 'group'
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

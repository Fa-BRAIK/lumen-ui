@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-sub',
        'x-dropdown-menu:sub' => ''
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-sub',
        'x-data' => 'dropdownMenuSubMenu',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

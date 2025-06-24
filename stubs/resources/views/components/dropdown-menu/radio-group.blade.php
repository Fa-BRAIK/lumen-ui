@props([
    'as' => 'div',
    'defaultValue' => null,
    'disabled' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-radio-group',
        'x-dropdown-menu:radio-group' => Js::from(compact('defaultValue', 'disabled')),
        'role' => 'menuitemradiogroup'
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'div',
    'defaultValue' => null,
    'disabled' => false,
])

@php($componentParams = Js::from(compact('defaultValue', 'disabled')))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-radio-group',
        'x-data' => "dropdownMenuRadioGroup($componentParams)",
        'role' => 'menuitemradiogroup'
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'div',
    'asChild' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'asChild' => $asChild,
        'data-slot' => 'dropdown-menu-trigger',
        'aria-haspopup' => 'true',
        'x-dropdown-menu:trigger' => ''
    ])
    ->merge($asChild ? [] : ['tab-index' => '0']))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

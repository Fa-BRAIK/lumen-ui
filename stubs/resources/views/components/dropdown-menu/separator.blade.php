@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('bg-border -mx-1 my-1 h-px')
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-separator',
        'role' => 'separator',
    ]))

<x-lumen::primitive :attributes="$attributes" />

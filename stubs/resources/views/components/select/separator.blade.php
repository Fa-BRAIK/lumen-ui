@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('bg-border pointer-events-none -mx-1 my-1 h-px')
    ->merge([
        'as' => $as,
        'data-slot' => 'select-separator',
        'role' => 'separator',
    ]))

<x-lumen::primitive :attributes="$attributes" />

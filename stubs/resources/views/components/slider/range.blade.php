@props([
    'as' => 'span',
])

@php($attributes = $attributes
    ->twMerge('bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full')
    ->merge([
        'as' => $as,
        'data-slot' => 'slider-range',
        'x-slider:range' => '',
    ]))

<x-lumen::primitive :attributes="$attributes" />

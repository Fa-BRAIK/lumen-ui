@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('bg-primary h-full w-full flex-1 transition-all')
    ->merge([
        'as' => $as,
        'data-slot' => 'progress-indicator',
        'x-progress:indicator' => ''
    ]))

<x-lumen::primitive :attributes="$attributes" />

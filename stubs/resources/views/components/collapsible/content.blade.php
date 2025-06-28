@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('')
    ->merge([
        'as' => $as,
        'data-slot' => 'collapsible-content',
        'x-collapsible:content' => '',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

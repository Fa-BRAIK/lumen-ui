@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('px-6')
    ->merge([
        'as' => $as,
        'data-slot' => 'card-content',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

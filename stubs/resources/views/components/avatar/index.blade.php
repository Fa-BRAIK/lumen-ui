@props([
    'as' => 'span',
])

@php($attributes = $attributes
    ->twMerge('relative flex size-8 shrink-0 overflow-hidden rounded-full')
    ->merge([
        'as' => $as,
        'data-slot' => 'avatar',
        'x-data' => 'avatar',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

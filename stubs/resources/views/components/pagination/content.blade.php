@props([
    'as' => 'ul',
])

@php($attributes = $attributes
    ->twMerge('flex flex-row items-center gap-1')
    ->merge([
        'as' => $as,
        'data-slot' => 'pagination-content',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

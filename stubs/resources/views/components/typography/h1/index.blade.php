@props([
    'as' => 'h1',
])

@php($attributes = $attributes
    ->twMerge('scroll-m-20 text-4xl font-extrabold tracking-tight text-balance')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

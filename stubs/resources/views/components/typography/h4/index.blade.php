@props([
    'as' => 'h4',
])

@php($attributes = $attributes
    ->twMerge('scroll-m-20 text-xl font-semibold tracking-tight')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

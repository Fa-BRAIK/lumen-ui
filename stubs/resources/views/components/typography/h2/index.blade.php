@props([
    'as' => 'h2',
])

@php($attributes = $attributes
    ->twMerge('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

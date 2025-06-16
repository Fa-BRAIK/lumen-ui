@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('text-lg font-semibold')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

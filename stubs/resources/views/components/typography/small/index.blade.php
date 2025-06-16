@props([
    'as' => 'small',
])

@php($attributes = $attributes
    ->twMerge('text-sm leading-none font-medium')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

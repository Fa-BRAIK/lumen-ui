@props([
    'as' => 'p',
])

@php($attributes = $attributes
    ->twMerge('leading-7 [&:not(:first-child)]:mt-6')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

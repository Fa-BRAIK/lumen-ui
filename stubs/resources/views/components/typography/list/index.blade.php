@props([
    'as' => 'ul',
])

@php($attributes = $attributes
    ->twMerge('my-6 ml-6 list-disc [&>li]:mt-2')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

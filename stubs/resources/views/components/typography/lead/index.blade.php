@props([
    'as' => 'p',
])

@php($attributes = $attributes
    ->twMerge('ext-muted-foreground text-xl')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

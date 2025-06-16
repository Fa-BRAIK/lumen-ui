@props([
    'as' => 'p',
])

@php($attributes = $attributes
    ->twMerge('text-muted-foreground text-sm')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

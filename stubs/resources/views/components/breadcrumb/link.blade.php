@props([
    'as' => 'a',
])

@php($attributes = $attributes
    ->twMerge('hover:text-foreground transition-colors')
    ->merge([
        'as' => $as,
        'data-slot' => 'breadcrumb-link',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

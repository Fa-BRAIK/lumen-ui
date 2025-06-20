@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('text-muted-foreground text-sm')
    ->merge([
        'as' => $as,
        'data-slot' => 'card-description',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'caption',
])

@php($attributes = $attributes
    ->twMerge('text-muted-foreground mt-4 text-sm')
    ->merge([
        'as' => $as,
        'data-slot' => 'table-caption',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'tfoot',
])

@php($attributes = $attributes
    ->twMerge('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0')
    ->merge([
        'as' => $as,
        'data-slot' => 'table-footer',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

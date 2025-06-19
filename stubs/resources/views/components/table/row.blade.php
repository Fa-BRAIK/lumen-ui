@props([
    'as' => 'tr',
])

@php($attributes = $attributes
    ->twMerge('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors')
    ->merge([
        'as' => $as,
        'data-slot' => 'table-row',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

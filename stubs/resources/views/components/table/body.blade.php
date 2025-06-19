@props([
    'as' => 'tbody',
])

@php($attributes = $attributes
    ->twMerge('[&_tr:last-child]:border-0')
    ->merge([
        'as' => $as,
        'data-slot' => 'table-body',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

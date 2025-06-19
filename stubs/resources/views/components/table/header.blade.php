@props([
    'as' => 'thead',
])

@php($attributes = $attributes
    ->twMerge('[&_tr]:border-b')
    ->merge([
        'as' => $as,
        'data-slot' => 'table-header',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

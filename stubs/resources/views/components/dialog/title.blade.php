@props([
    'as' => 'h2'
])

@php($attributes = $attributes
    ->twMerge('text-lg font-semibold')
    ->merge([
        'as' => $as,
        'data-slot' => 'dialog-title',
        'x-data' => 'dialogTitle',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

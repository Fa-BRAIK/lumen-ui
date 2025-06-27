@props([
    'as' => 'h2'
])

@php($attributes = $attributes
    ->twMerge('text-lg font-semibold')
    ->merge([
        'as' => $as,
        'data-slot' => 'alert-dialog-title',
        'x-alert-dialog:title' => '',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

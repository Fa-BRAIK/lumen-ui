@props([
    'as' => 'button',
    'type' => 'button',
    'asChild' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'type' => $as === 'button' ? $type : null,
        'asChild' => $asChild,
        'data-slot' => 'dialog-close',
        'x-data' => 'dialogClose',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

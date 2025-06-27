@props([
    'as' => 'button',
    'variant' => 'default',
    'size' => 'base',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'variant' => $variant,
        'size' => $size,
        'data-slot' => 'dialog-action',
    ]))

<x-lumen::button :attributes="$attributes">
    {{ $slot }}
</x-lumen::button>

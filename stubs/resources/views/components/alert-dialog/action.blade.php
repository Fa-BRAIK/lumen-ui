@props([
    'as' => 'button',
    'variant' => 'default',
    'size' => 'default',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'variant' => $variant,
        'size' => $size,
        'data-slot' => 'alert-dialog-action',
        'x-alert-dialog:action' => '',
    ]))

<x-lumen::button :attributes="$attributes">
    {{ $slot }}
</x-lumen::button>

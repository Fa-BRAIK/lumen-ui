@props([
    'as' => 'button',
    'variant' => 'outline',
    'size' => 'default',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'variant' => $variant,
        'size' => $size,
        'data-slot' => 'alert-dialog-cancel',
        'x-alert-dialog:cancel' => '',
    ]))

<x-lumen::button :attributes="$attributes">
    {{ $slot }}
</x-lumen::button>


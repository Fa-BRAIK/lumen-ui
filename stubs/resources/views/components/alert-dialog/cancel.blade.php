@props([
    'as' => 'button',
    'variant' => 'outline',
    'size' => 'base',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'variant' => $variant,
        'size' => $size,
        'data-slot' => 'alert-dialog-cancel',
        'x-data' => 'alertDialogCancel',
    ]))

<x-lumen::button :attributes="$attributes">
    {{ $slot }}
</x-lumen::button>


@props([
    'as' => 'div',
    'asChild' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'x-alert-dialog:trigger' => '',
        'data-slot' => 'alert-dialog-trigger',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'div',
    'asChild' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'x-dialog:trigger' => '',
        'data-slot' => 'dialog-trigger',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

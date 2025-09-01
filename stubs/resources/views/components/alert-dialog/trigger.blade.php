@props([
    'as' => 'div',
    'asChild' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'x-data' => 'alertDialogTrigger',
        'data-slot' => 'alert-dialog-trigger',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

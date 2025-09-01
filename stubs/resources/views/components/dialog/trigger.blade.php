@props([
    'as' => 'div',
    'asChild' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'x-dialog:trigger' => '',
        'x-data' => 'dialogTrigger',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

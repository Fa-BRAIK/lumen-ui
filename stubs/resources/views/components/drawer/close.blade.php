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
        'data-slot' => 'drawer-close',
        'x-drawer:close' => '',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'div',
    'defaultOpen' => false,
    'disabled' => false,
])
@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'collapsible',
        'x-collapsible' => Js::from(compact('defaultOpen', 'disabled'))
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

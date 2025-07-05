@props([
    'as' => 'div',
    'defaultOpen' => false,
    'modal' => true,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'drawer-container',
        'x-drawer' => Js::from(compact('defaultOpen', 'modal')),
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

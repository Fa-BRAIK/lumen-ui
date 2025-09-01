@props([
    'as' => 'div',
    'defaultOpen' => false,
    'modal' => true,
])

@php($componentParams = Js::from(compact('defaultOpen', 'modal')))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'drawer-container',
        'x-data' => "drawer($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

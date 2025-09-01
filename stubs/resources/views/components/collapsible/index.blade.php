@props([
    'as' => 'div',
    'defaultOpen' => false,
    'disabled' => false,
])

@php($componentParams = Js::from(compact('defaultOpen', 'disabled')))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'collapsible',
        'x-data' => "collapsible($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

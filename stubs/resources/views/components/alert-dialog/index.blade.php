@props([
    'as' => 'div',
    'defaultOpen' => false,
])

@php($componentParams = Js::from(compact('defaultOpen')))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'alert-dialog-container',
        'x-data' => "alertDialog($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'span',
    'placeholder' => '',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'select-value',
        'x-select:value' => Js::from(compact('placeholder')),
        'style' => 'pointer-events: none;'
    ]))

<x-lumen::primitive :attributes="$attributes" />

@props([
    'as' => 'span',
    'placeholder' => '',
])

@php($componentParams = Js::from(compact('placeholder')))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'select-value',
        'x-data' => "selectValue($componentParams)",
        'style' => 'pointer-events: none;'
    ]))

<x-lumen::primitive :attributes="$attributes" />

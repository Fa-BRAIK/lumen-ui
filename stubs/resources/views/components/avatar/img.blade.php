@props([
    'as' => 'img',
    'src',
    'alt' => '',
])

@php($attributes = $attributes
    ->twMerge('aspect-square size-full')
    ->merge([
        'as' => $as,
        'alt' => $alt,
        'data-slot' => 'avatar-image',
        'x-avatar:image' => Js::from(compact('src'))
    ]))

<x-lumen::primitive :attributes="$attributes" />

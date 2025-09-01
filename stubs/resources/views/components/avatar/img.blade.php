@props([
    'as' => 'img',
    'src',
    'alt' => '',
])

@php($componentParams = Js::from(compact('src')))

@php($attributes = $attributes
    ->twMerge('aspect-square size-full')
    ->merge([
        'as' => $as,
        'alt' => $alt,
        'data-slot' => 'avatar-image',
        'x-data' => "avatarImage($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes" />

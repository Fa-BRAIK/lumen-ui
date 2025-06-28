@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('bg-muted mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full data-[side=left]:hidden data-[side=right]:hidden')
    ->merge([
        'as' => $as,
        'x-drawer:handle' => '',
        'data-slot' => 'drawer-handle',
    ]))

<x-lumen::primitive :attributes="$attributes" />

@props([
    'as' => 'div',
    // The orientation of the toggle group, can be 'horizontal' or 'vertical'
    'orientation' => 'horizontal',
    // Whether or not the component is purely decorative. When true, accessibility-related attributes
    // are updated so that the rendered element is removed from the accessibility tree.
    'decorative' => false,
])

@php($attributes = $attributes
    ->twMerge('bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px')
    ->merge([
        'as' => $as,
        'data-slot' => 'separator',
        'role' => $decorative ? 'none' : 'separator',
        'aria-orientation' => $decorative ? null : $orientation,
        'data-orientation' => $orientation,
    ]))

<x-lumen::primitive :attributes="$attributes" />

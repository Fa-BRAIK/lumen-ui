@props([
    'as' => 'div',
    // Type can be 'single' or 'multiple'
    'type' => 'single',
    // Orientation can be 'horizontal' or 'vertical'
    'orientation' => 'vertical',
    // Direction can be 'ltr' or 'rtl'
    'dir' => 'ltr',
    // Either an array of items or a single item
    'defaultValue' => null,
    // When type is "single" Allows closing content when clicking trigger for an open item.
    'collapsible' => false,
    // When set to false, disabled looped navigation using arrow keys
    'loop' => true,
    // Whether the accordion is disabled
    'disabled' => false,
])

@php($defaultValue = array_filter(is_array($defaultValue) ? $defaultValue : [$defaultValue]))

@php($componentParams = Js::from(compact('defaultValue', 'type', 'orientation', 'dir', 'collapsible', 'loop', 'disabled')))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-type' => $type,
        'data-slot' => 'accordion',
        'x-data' => "accordion($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

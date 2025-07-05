@use('Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

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

@php(throw_unless(
    in_array($type, ['single', 'multiple']),
    InvalidComponentException::invalidAccordionType()
))

@php(throw_unless(
    $type !== 'single' || !is_array($defaultValue),
    InvalidComponentException::invalidAccordionDefaultValueRelativeToType()
))

@php($defaultValue = array_filter(is_array($defaultValue) ? $defaultValue : [$defaultValue]))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-type' => $type,
        'data-slot' => 'accordion',
        'x-accordion' => Js::from(compact('defaultValue', 'type', 'orientation', 'dir', 'collapsible', 'loop', 'disabled'))
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

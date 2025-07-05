@props([
    'as' => 'div',
    'defaultValue' => null,
    'orientation' => 'horizontal',
    'dir' => 'ltr',
    'loop' => true,
    'disabled' => false,
])

@php($attributes = $attributes
    ->twMerge('grid gap-3')
    ->merge([
        'as' => $as,
        'role' => 'radiogroup',
        'data-slot' => 'radio-group',
        'tabindex' => 0,
        'aria-required' => $attributes->get('required', false) ? 'true' : 'false',
        'x-radio-group' => Js::from(compact('defaultValue', 'orientation', 'dir', 'loop', 'disabled'))
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

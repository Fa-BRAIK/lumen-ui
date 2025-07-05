@props([
    'as' => 'div',
    'defaultValue' => null,
    'defaultOpen' => false,
    'dir' => 'ltr',
    'disabled' => false,
])

@php($attributes = $attributes
    ->twMerge('')
    ->merge([
        'as' => $as,
        'data-slot' => 'select',
        'x-select' => Js::from(compact('defaultValue', 'defaultOpen', 'dir', 'disabled')),
        'style' => Arr::toCssStyles([
            '--lumen-select-transform-origin:' . ($dir === 'rtl' ? 'right' : 'left'),
        ]),
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'div',
    'defaultValue' => null,
    'defaultOpen' => false,
    'dir' => 'ltr',
    'disabled' => false,
])

@php($componentParams = Js::from(compact('defaultValue', 'defaultOpen', 'dir', 'disabled')))

@php($attributes = $attributes
    ->twMerge('')
    ->merge([
        'as' => $as,
        'data-slot' => 'select',
        'x-data' => "select($componentParams)",
        'style' => Arr::toCssStyles([
            '--lumen-select-transform-origin:' . ($dir === 'rtl' ? 'right' : 'left'),
        ]),
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

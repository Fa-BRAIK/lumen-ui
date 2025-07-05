@props([
    'as' => 'div',
    'defaultOpen' => false,
    'dir' => 'ltr',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'x-popover' => Js::from(compact('defaultOpen')),
        'style' => Arr::toCssStyles([
            '--lumen-popover-content-transform-origin: ' . ($dir === 'rtl' ? 'right' : 'left'),
        ])
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>


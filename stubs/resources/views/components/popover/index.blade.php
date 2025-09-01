@props([
    'as' => 'div',
    'defaultOpen' => false,
    'dir' => 'ltr',
])

@php($componentParams = Js::from(compact('defaultOpen')))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'x-data' => "popover($componentParams)",
        'style' => Arr::toCssStyles([
            '--lumen-popover-content-transform-origin: ' . ($dir === 'rtl' ? 'right' : 'left'),
        ])
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>


@props([
    'as' => 'div',
    'defaultOpen' => false,
    'delayDuration' => 700,
    'closeDelay' => 300,
    'dir' => 'ltr',
])

@php($componentParams = Js::from(compact('defaultOpen', 'delayDuration', 'closeDelay')))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'x-data' => "hoverCard($componentParams)",
        'style' => Arr::toCssStyles([
            '--lumen-hover-card-content-transform-origin: ' . ($dir === 'rtl' ? 'right' : 'left'),
        ])
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

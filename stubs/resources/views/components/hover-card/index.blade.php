@use('Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => 'div',
    'defaultOpen' => false,
    'delayDuration' => 700,
    'closeDelay' => 300,
    'dir' => 'ltr',
])

@php(throw_unless(
    is_numeric($delayDuration) && $delayDuration >= 0,
    InvalidComponentException::invalidHoverCardDelayDuration()
))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'x-hover-card' => Js::from(compact('defaultOpen', 'delayDuration', 'closeDelay')),
        'style' => Arr::toCssStyles([
            '--lumen-hover-card-content-transform-origin: ' . ($dir === 'rtl' ? 'right' : 'left'),
        ])
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

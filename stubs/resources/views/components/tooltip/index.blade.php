@props([
    'as' => 'div',
    'delayDuration' => 0,
    'skipDelayDuration' => 0,
    'defaultOpen' => false,
])

@php($componentParams = Js::from(compact('delayDuration', 'skipDelayDuration', 'defaultOpen')))

@php($attributes = $attributes
    ->twMerge('')
    ->merge([
        'as' => $as,
        'data-slot' => 'tooltip',
        'x-data' => "tooltip($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@use('Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => 'div',
    'delayDuration' => 0,
    'skipDelayDuration' => 0,
    'defaultOpen' => false,
])

@php(throw_unless(
    is_numeric($delayDuration) && $delayDuration >= 0,
    InvalidComponentException::invalidTooltipDelayDuration()
))

@php($attributes = $attributes
    ->twMerge('')
    ->merge([
        'as' => $as,
        'data-slot' => 'tooltip',
        'x-tooltip' => Js::from(compact('delayDuration', 'skipDelayDuration', 'defaultOpen'))
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

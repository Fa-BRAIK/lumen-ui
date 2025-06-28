@props([
    'as' => 'div',
    'value',
])

@aware([
    'disabled' => false,
])

@php($attributes = $attributes
    ->twMerge('border-b last:border-b-0')
    ->merge([
        'as' => $as,
        'data-slot' => 'accordion-item',
        'x-accordion:item' => Js::from(compact('value', 'disabled'))
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

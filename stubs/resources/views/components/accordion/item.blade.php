@props([
    'as' => 'div',
    'value',
])

@aware([
    'disabled' => false,
])

@php($componentParams = Js::from(compact('value', 'disabled')))

@php($attributes = $attributes
    ->twMerge('border-b last:border-b-0')
    ->merge([
        'as' => $as,
        'data-slot' => 'accordion-item',
        'x-data' => "accordionItem($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

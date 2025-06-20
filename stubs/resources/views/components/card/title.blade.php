@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('leading-none font-semibold')
    ->merge([
        'as' => $as,
        'data-slot' => 'card-title',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

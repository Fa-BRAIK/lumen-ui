@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('flex items-center px-6 [.border-t]:pt-6')
    ->merge([
        'as' => $as,
        'data-slot' => 'card-footer',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

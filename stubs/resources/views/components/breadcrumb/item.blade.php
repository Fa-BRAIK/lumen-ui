@props([
    'as' => 'li',
])

@php($attributes = $attributes
    ->twMerge('inline-flex items-center gap-1.5')
    ->merge([
        'as' => $as,
        'data-slot' => 'breadcrumb-item',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

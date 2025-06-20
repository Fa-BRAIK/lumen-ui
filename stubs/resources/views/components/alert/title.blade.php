@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight')
    ->merge([
        'as' => $as,
        'data-slot' => 'alert-title'
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'div'
])

@php($attributes = $attributes
    ->twMerge('mt-auto flex flex-col gap-2 p-4')
    ->merge([
        'as' => $as,
        'x-data-slot' => 'drawer-footer',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>


@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('col-start-2 row-span-2 row-start-1 self-start justify-self-end')
    ->merge([
        'as' => $as,
        'data-slot' => 'card-action',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

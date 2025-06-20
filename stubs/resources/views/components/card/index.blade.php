@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm')
    ->merge([
        'as' => $as,
        'data-slot' => 'card',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

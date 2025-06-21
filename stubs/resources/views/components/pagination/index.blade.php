@props([
    'as' => 'nav',
])

@php($attributes = $attributes
    ->twMerge('mx-auto flex w-full justify-center')
    ->merge([
        'as' => $as,
        'role' => 'navigation',
        'data-slot' => 'pagination',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

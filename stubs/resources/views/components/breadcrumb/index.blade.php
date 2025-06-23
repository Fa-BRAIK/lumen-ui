@props([
    'as' => 'nav',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'aria-label' => 'breadcrumb',
        'data-slot' => 'breadcrumb',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

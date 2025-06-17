@props([
    'as' => 'li',
])

@php($attributes = $attributes
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

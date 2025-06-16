@props([
    'as' => 'blockquote',
])

@php($attributes = $attributes
    ->twMerge('mt-6 border-l-2 pl-6 italic')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

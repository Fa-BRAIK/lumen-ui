@props([
    'as' => 'span',
])

@php($attributes = $attributes
    ->twMerge('bg-muted flex size-full items-center justify-center rounded-full')
    ->merge([
        'as' => $as,
        'data-slot' => 'avatar-fallback',
        'x-avatar:fallback' => ''
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

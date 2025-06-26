@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('p-1 w-full scroll-my-1 max-h-[var(--lumen-select-content-available-height)] min-w-[var(--radix-select-trigger-width)]')
    ->merge([
        'as' => $as,
        'data-slot' => '',
        'role' => 'presentation',
        'data-lumen-select-viewport' => true,
        'style' => 'position: relative; flex: 1 1 0%; overflow: hidden auto;',
        'x-select:viewport' => '',
    ]))

<style>
    [data-lumen-select-viewport] {
        scrollbar-width: none;
        -ms-overflow-style: none;
        -webkit-overflow-scrolling: touch;
    }

    [data-lumen-select-viewport]::-webkit-scrollbar {
        display: none
    }
</style>

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

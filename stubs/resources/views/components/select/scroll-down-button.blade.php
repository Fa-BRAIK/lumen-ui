@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('bg-popover absolute bottom-0 z-10 w-full flex cursor-default items-center justify-center py-1')
    ->merge([
        'as' => $as,
        'data-slot' => 'select-scroll-down-button',
        'x-data' => 'selectScrollDownButton',
    ]))

<x-lumen::primitive :attributes="$attributes">
    <x-lucide-chevron-down class="size-4" />
</x-lumen::primitive>

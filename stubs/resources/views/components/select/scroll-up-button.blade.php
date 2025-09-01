@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('bg-popover absolute top-0 z-10 w-full text-popover-foreground flex cursor-default items-center justify-center py-1')
    ->merge([
        'as' => $as,
        'data-slot' => 'select-scroll-up-button',
        'x-data' => 'selectScrollUpButton',
    ]))

<x-lumen::primitive :attributes="$attributes">
    <x-lucide-chevron-up class="size-4" />
</x-lumen::primitive>

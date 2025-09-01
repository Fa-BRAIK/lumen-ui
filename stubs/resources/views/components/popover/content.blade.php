@props([
    'as' => 'div',
    // Side of the dropdown menu content could be 'top', 'right', 'bottom', or 'left'
    'side' => 'bottom',
    // Align the dropdown menu content to the side, could be 'start', 'center', or 'end'
    'align' => 'center',
    'sideOffset' => 4,
])

@php($componentParams = Js::from(compact('side', 'align', 'sideOffset')))

@php($attributes = $attributes
    ->twMerge('bg-popover text-popover-foreground z-50 w-72 origin-(--lumen-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden')
    ->merge([
        'as' => $as,
        'data-slot' => 'popover-card-content',
        'x-data' => "popoverContent($componentParams)",
    ]))

<template x-teleport="body">
    <x-lumen::primitive :attributes="$attributes">
        {{ $slot }}
    </x-lumen::primitive>
</template>


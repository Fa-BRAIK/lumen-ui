@props([
    'as' => 'div',
    // Side of the tooltip content could be 'top', 'right', 'bottom', or 'left'
    'side' => 'top',
    // Align the tooltip content to the side, could be 'start', 'center', or 'end'
    'align' => 'center',
    'sideOffset' => 4,
])

@php($attributes = $attributes
    ->twMerge('bg-popover text-popover-foreground z-50 max-h-(--lumen-dropdown-menu-available-height) min-w-[8rem] origin-(--lumen-dropdown-menu-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md pointer-events-auto')
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-content',
        'role' => 'menu',
        'tabindex' => '-1',
        'x-dropdown-menu:content' => Js::from(compact('side', 'align', 'sideOffset')),
    ]))

<template x-teleport="body">
    <x-lumen::primitive :attributes="$attributes">
        {{ $slot }}
    </x-lumen::primitive>
</template>

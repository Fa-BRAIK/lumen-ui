@props([
    'as' => 'div',
    // Side of the dropdown submenu content could be 'top', 'right', 'bottom', or 'left'
    'side' => 'right',
    // Align the dropdown submenu content to the side, could be 'start', 'center', or 'end'
    'align' => 'start',
    'sideOffset' => 0,
])

@php($componentParams = Js::from(compact('side', 'align', 'sideOffset')))

@php($attributes = $attributes
    ->twMerge('bg-popover text-popover-foreground z-50 max-h-(--lumen-dropdown-menu-available-height) min-w-[8rem] origin-(--lumen-dropdown-menu-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg pointer-events-auto')
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-sub-content',
        'role' => 'menu',
        'tabindex' => '-1',
        'x-data' => "dropdownMenuSubMenuContent($componentParams)",
    ]))

<template x-teleport="body">
    <x-lumen::primitive :attributes="$attributes">
        {{ $slot }}
    </x-lumen::primitive>
</template>

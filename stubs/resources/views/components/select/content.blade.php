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
    ->twMerge('bg-popover text-popover-foreground relative z-50 min-w-[8rem] origin-(--lumen-select-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md pointer-events-auto')
    ->merge([
        'as' => $as,
        'data-slot' => 'select-content',
        'role' => 'listbox',
        'x-data' => "selectContent($componentParams)",
        'style' => Arr::toCssStyles([
            'width: var(--lumen-trigger-width)',
        ])
    ]))

<template x-teleport="body">
    <x-lumen::primitive :attributes="$attributes">
        <x-lumen::select.scroll-up-button />
        <x-select.viewport>
            {{ $slot }}
        </x-select.viewport>
        <x-lumen::select.scroll-down-button />
    </x-lumen::primitive>
</template>

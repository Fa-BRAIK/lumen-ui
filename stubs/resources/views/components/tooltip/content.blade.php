@props([
    'as' => 'div',
    // Side of the tooltip content could be 'top', 'right', 'bottom', or 'left'
    'side' => 'top',
    // Align the tooltip content to the side, could be 'start', 'center', or 'end'
    'align' => 'center',
    'sideOffset' => 0,
    // When set to true, the tooltip will try to avoid collisions with the viewport edges
    'avoidCollisions' => true,
    // Add an arrow to the tooltip content
    'arrow' => true,
])

@php($componentParams = Js::from(compact('side', 'align', 'sideOffset', 'avoidCollisions', 'arrow')))

@php($attributes = $attributes
    ->twMerge('bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance')
    ->merge([
        'as' => $as,
        'data-slot' => 'tooltip-content',
        'x-data' => "tooltipContent($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}

    @if ($arrow)
        <x-lumen::arrow
            data-slot="tooltip-arrow"
            class="bg-primary fill-primary z-50 size-2.5 absolute rotate-45 rounded-[2px] pointer-none:"
        />
    @endif
</x-lumen::primitive>

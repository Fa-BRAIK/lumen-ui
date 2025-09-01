@props([
    'as' => 'dialog',
    // Side of the dropdown menu content could be 'top', 'right', 'bottom', or 'left'
    'side' => 'bottom',
])

@php($componentParams = Js::from(compact('side')))

@php($attributes = $attributes
    ->twMerge(
        'group/drawer-content fixed open:block bg-background backdrop:bg-black/50 shadow-lg gap-4 border w-full max-w-full duration-200',
        'data-[side=bottom]:inset-block-start-auto data-[side=bottom]:rounded-t-lg data-[side=bottom]:rounded-b-none',
        'data-[side=top]:rounded-b-lg data-[side=top]:rounded-t-none',
        'data-[side=left]:end-auto data-[side=left]:rounded-r-lg data-[side=left]:rounded-l-none data-[side=left]:max-h-full data-[side=left]:h-full data-[side=left]:max-w-md',
        'data-[side=right]:start-auto data-[side=right]:rounded-l-lg data-[side=right]:rounded-r-none data-[side=right]:max-h-full data-[side=right]:h-full data-[side=right]:max-w-md',
    )
    ->merge([
        'as' => $as,
        'data-slot' => 'drawer-dialog',
        'x-data' => "drawerContent($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    <div class="mx-auto w-full max-w-sm">
        {{ $slot }}
    </div>
</x-lumen::primitive>

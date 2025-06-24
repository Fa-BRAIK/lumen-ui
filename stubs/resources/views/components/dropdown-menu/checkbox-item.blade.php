@props([
    'as' => 'div',
    'disabled' => false,
])

@php($attributes = $attributes
    ->twMerge("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4")
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-checkbox-item',
        'role' => 'menuitemcheckbox',
        'x-dropdown-menu:checkbox-item' => '',
    ]))

<x-lumen::primitive :attributes="$attributes">
    <span 
        class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
        x-dropdown-menu:checkbox-item-indicator
    >
        <x-lucide-check class="size-4" />
    </span>

    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'div',
    'variant' => 'default',
    'disabled' => false,
])

@aware([
    'inset' => null,
])

@php($attributes = $attributes
    ->twMerge("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4")
    ->merge([
        'as' => $as,
        'data-variant' => $variant,
        'data-slot' => 'dropdown-menu-item',
        'role' => 'menuitem',
        'tabindex' => '-1',
        'x-dropdown-menu:item' => Js::from(compact('disabled')),
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

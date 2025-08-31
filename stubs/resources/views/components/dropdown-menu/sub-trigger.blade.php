@props([
    'as' => 'div',
    'inset' => null,
])

@php($attributes = $attributes
    ->twMerge('focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8')
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-sub-trigger',
        'role' => 'menuitem',
        'x-data' => 'dropdownMenuSubMenuTrigger',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
    <x-lucide-chevron-right class="ml-auto size-4" />
</x-lumen::primitive>

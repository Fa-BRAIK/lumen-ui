@props([
    'as' => 'div',
    'value',
    'disabled' => false,
])

@php($componentParams = Js::from(compact('value', 'disabled')))

@php($attributes = $attributes
    ->twMerge("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2")
    ->merge([
        'as' => $as,
        'data-slot' => 'select-item',
        'role' => 'option',
        'x-data' => "selectItem($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
        <x-lumen::select.item.indicator>
            <x-lucide-check class="size-4" />
        </x-lumen::select.item.indicator>
    </span>

    <x-lumen::select.item.text>
        {{ $slot }}
    </x-lumen::select.item.text>
</x-lumen::primitive>

@props([
    'as' => 'div'
])

@php($attributes = $attributes
    ->twMerge('flex flex-col gap-0.5 p-4 group-data-[side=bottom]/drawer-content:text-center group-data-[side=top]/drawer-content:text-center md:gap-1.5 md:text-left')
    ->merge([
        'as' => $as,
        'x-data-slot' => 'drawer-header',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

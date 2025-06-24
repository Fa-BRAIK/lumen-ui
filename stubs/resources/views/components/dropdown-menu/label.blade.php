@props([
    'as' => 'div',
    'inset' => null,
])

@php($attributes = $attributes
    ->twMerge('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8')
    ->merge([
        'as' => $as,
        'data-inset' => $inset,
        'data-slot' => 'dropdown-menu-label',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

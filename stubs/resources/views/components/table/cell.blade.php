@props([
    'as' => 'td',
])

@php($attributes = $attributes
    ->twMerge('p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]')
    ->merge([
        'as' => $as,
        'data-slot' => 'table-cell',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

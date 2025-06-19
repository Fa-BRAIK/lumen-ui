@props([
    'as' => 'th',
])

@php($attributes = $attributes
    ->twMerge('text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]')
    ->merge([
        'as' => $as,
        'data-slot' => 'table-head',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

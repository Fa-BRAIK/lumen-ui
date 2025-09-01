@props([
    'as' => 'h2'
])

@php($attributes = $attributes
    ->twMerge('text-lg font-semibold')
    ->merge([
        'as' => $as,
        'data-slot' => 'drawer-title',
        'x-data' => 'drawerTitle',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

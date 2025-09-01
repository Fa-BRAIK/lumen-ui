@props([
    'as' => 'p'
])

@php($attributes = $attributes
    ->twMerge('text-muted-foreground text-sm')
    ->merge([
        'as' => $as,
        'data-slot' => 'drawer-description',
        'x-data' => 'drawerDescription',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

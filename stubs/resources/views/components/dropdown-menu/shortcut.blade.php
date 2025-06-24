@props([
    'as' => 'span',
])

@php($attributes = $attributes
    ->twMerge('text-muted-foreground ml-auto text-xs tracking-widest')
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu-shortcut',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

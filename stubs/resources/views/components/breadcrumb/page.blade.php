@props([
    'as' => 'span',
])

@php($attributes = $attributes
    ->twMerge('text-foreground font-normal')
    ->merge([
        'as' => $as,
        'role' => 'link',
        'data-slot' => 'breadcrumb-page',
        'aria-disabled' => 'true',
        'aria-current' => 'page',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('text-muted-foreground px-2 py-1.5 text-xs')
    ->merge([
        'as' => $as,
        'data-slot' => 'select-label'
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

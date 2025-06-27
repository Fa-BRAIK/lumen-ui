@props([
    'as' => 'p'
])

@php($attributes = $attributes
    ->twMerge('text-muted-foreground text-sm')
    ->merge([
        'as' => $as,
        'data-slot' => 'alert-dialog-description',
        'x-dialog:description' => '',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

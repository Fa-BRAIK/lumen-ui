@props([
    'as' => 'div'
])

@php($attributes = $attributes
    ->twMerge('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end')
    ->merge([
        'as' => $as,
        'x-data-slot' => 'alert-dialog-footer',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>


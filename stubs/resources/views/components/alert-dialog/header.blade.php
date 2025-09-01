@props([
    'as' => 'div'
])

@php($attributes = $attributes
    ->twMerge('flex flex-col gap-2 text-center sm:text-left')
    ->merge([
        'as' => $as,
        'data-slot' => 'alert-dialog-header',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

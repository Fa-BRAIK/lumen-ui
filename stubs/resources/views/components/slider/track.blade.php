@props([
    'as' => 'span',
])

@php($attributes = $attributes
    ->twMerge('bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5')
    ->merge([
        'as' => $as,
        'data-slot' => 'slider-track',
        'x-slider:track' => ''
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

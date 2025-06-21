@props([
    'as' => 'a',
    'active' => false,
    'size' => 'icon',
])

@php($attributes = $attributes
    ->twMerge('')
    ->merge([
        'as' => $as,
        'data-slot' => 'pagination-link',
        'data-active' => $active ? 'true' : 'false',
        'size' => $size,
        'variant' => $active ? 'outline' : 'ghost',
    ]))

<x-lumen::button :attributes="$attributes">
    {{ $slot }}
</x-lumen::button>

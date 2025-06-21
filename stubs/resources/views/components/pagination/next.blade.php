@props([
    'as' => 'a',
    'size' => 'base',
])

@php($attributes = $attributes
    ->twMerge('gap-1 px-2.5 sm:pl-2.5')
    ->merge([
        'as' => 'a',
        'size' => $size,
    ]))

<x-lumen::pagination.link :attributes="$attributes">
    {{ $slot }}
    <x-lucide-chevron-right />
</x-lumen::pagination.link>

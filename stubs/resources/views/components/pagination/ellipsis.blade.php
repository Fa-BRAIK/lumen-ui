@props([
    'as' => 'span',
    'srOnly' => 'More pages',
])

@php($attributes = $attributes
    ->twMerge('flex size-9 items-center justify-center')
    ->merge([
        'as' => $as,
        'data-slot' => 'pagination-ellipsis',
    ]))

<x-lumen::primitive :attributes="$attributes">
    <x-lucide-more-horizontal class="size-4" />
    <span class="sr-only">{{ $srOnly }}</span>
</x-lumen::primitive>

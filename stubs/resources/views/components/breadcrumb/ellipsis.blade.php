@props([
    'as' => 'span',
])

@php($attributes = $attributes
    ->twMerge('flex size-9 items-center justify-center')
    ->merge([
        'as' => $as,
        'role' => 'presentation',
        'aria-hidden' => 'true',
    ]))

<x-lumen::primitive :attributes="$attributes">
    <x-lucide-more-horizontal class="size-4" />

    <span class="sr-only">{{ __('More') }}</span>
</x-lumen::primitive>

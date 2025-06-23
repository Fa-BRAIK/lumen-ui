@props([
    'as' => 'li',
])

@php($attributes = $attributes
    ->twMerge('[&>svg]:size-3.5')
    ->merge([
        'as' => $as,
        'role' => 'presentation',
        'data-slot' => 'breadcrumb-separator',
        'aria-hidden' => 'true',
    ]))

<x-lumen::primitive :attributes="$attributes">
    @if ($slot->isNotEmpty())
        {{ $slot }}
    @else
        <x-lucide-chevron-right />
    @endif
</x-lumen::primitive>

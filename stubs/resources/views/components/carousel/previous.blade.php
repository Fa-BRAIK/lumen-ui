@props([
    'variant' => 'outline',
    'size' => 'icon',
])

@aware([
    'orientation' => 'horizontal',
])

@php($attributes = $attributes
    ->twMerge(
        'absolute size-8 rounded-full',
        $orientation === 'horizontal' ? 'top-1/2 -left-12 -translate-y-1/2' : '-top-12 left-1/2 -translate-x-1/2 rotate-90'
    )
    ->merge([
        'variant' => $variant,
        'size' => $size,
        'data-slot' => 'carousel-previous',
        'x-data' => 'carouselPrevious',
    ]))

<x-lumen::button :attributes="$attributes">
    <x-lucide-arrow-left />
    <span class="sr-only">{{ __('Previous slide') }}</span>
</x-lumen::button>

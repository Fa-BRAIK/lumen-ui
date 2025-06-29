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
        $orientation === 'horizontal' ? 'top-1/2 -right-12 -translate-y-1/2' : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90'
    )
    ->merge([
        'variant' => $variant,
        'size' => $size,
        'data-slot' => 'carousel-next',
        'x-carousel:next' => ''
    ]))

<x-lumen::button :attributes="$attributes">
    <x-lucide-arrow-right />
    <span class="sr-only">{{ __('Next slide') }}</span>
</x-lumen::button>

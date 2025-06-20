@props([
    'as' => 'span',
])

@php($attributes = $attributes
    ->twMerge('border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50')
    ->merge([
        'as' => $as,
        'data-slot' => 'slider-thumb',
        'x-slider:thumb' => '',
        'tabindex' => '0',
    ]))

<span
    style="{{ Arr::toCssStyles([ 
        'position: absolute',
        'transform: var(--lumen-slider-thumb-transform-x)',
        'z-index: var(--lumen-slider-thumb-z-index, 1)'
    ]) }}"
>
    <x-lumen::primitive :attributes="$attributes" />
</span>

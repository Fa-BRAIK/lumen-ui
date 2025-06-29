@props([
    'as' => 'div',
])

@aware([
    'orientation' => 'horizontal',
])

@php($attributes = $attributes
    ->twMerge(
        'min-w-0 shrink-0 grow-0 basis-full',
        $orientation === 'horizontal' ? 'pl-4' : 'pt-4'
    )
    ->merge([
        'as' => $as,
        'role' => 'group',
        'data-slot' => 'carousel-item',
        'aria-roledescription' => __('Slide')
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

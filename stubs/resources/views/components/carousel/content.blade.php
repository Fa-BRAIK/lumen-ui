@props([
    'as' => 'div',
])

@aware([
    'orientation' => 'horizontal',
])

@php($attributes = $attributes
    ->twMerge(
        'flex',
        $orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col'
    )
    ->merge([
        'as' => $as,
    ]))

<x-lumen::primitive
    as="div"
    class="overflow-hidden"
    data-slot="carousel-content"
    x-carousel:content=""
>
    <x-lumen::primitive :attributes="$attributes">
        {{ $slot }}
    </x-lumen::primitive>
</x-lumen::primitive>

@props([
    'as' => 'div',
])

@php($attributes = $attributes
    ->twMerge('overflow-hidden text-sm')
    ->merge([
        'as' => $as,
        'data-slot' => 'accordion-content',
        'x-data' => 'accordionContent',
    ]))

<x-lumen::primitive :attributes="$attributes">
    <div class="pt-0 pb-4">
        {{ $slot }}
    </div>
</x-lumen::primitive>

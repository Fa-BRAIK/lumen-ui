@props([
    'as' => 'label',
])

@php($attributes = $attributes
    ->twMerge('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50')
    ->merge([
        'as' => $as,
        'data-slot' => 'label',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

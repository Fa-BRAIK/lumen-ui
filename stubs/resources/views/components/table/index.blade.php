@props([
    'as' => 'table',
    'wrapperAs' => 'div',
])

@php($attributes = $attributes
    ->twMerge('w-full caption-bottom text-sm')
    ->merge([
        'as' => $as,
        'data-slot' => 'table',
    ]))

<x-lumen::primitive
    :as="$wrapperAs"
    data-slot="table-container"
    class="relative w-full overflow-x-auto"
>
    <x-lumen::primitive :attributes="$attributes">
        {{ $slot }}
    </x-lumen::primitive>
</x-lumen::primitive>

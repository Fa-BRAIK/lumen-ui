@props([
    'value',
])

@php($attributes = $attributes
    ->twMerge('flex-1 outline-none')
    ->merge([
        'tab-index' => '0',
        'data-slot' => 'tabs-content',
        'role' => 'tabpanel',
        'x-cloak' => '',
        'x-tab:content' => Js::from(compact('value')),
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

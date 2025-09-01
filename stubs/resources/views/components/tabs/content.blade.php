@props([
    'as' => 'div',
    'value',
])

@php($componentParams = Js::from(compact('value')))

@php($attributes = $attributes
    ->twMerge('flex-1 outline-none')
    ->merge([
        'tab-index' => '0',
        'data-slot' => 'tabs-content',
        'role' => 'tabpanel',
        'x-data' => "tabsContent($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

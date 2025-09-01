@props([
    'as' => 'button',
    // The value given to the toggle group item when selected
    'value',
])

@aware([
    // Properties inherited from the toggle group component
    'dir' => 'ltr',
    'variant' => 'default',
    'size' => 'base',
    'type' => 'multiple',
    'orientation' => 'horizontal',
    'disabled' => false,
])

@php($componentParams = Js::from(compact('value', 'disabled', 'orientation', 'type', 'dir')))

@php($attributes = $attributes
    ->twMerge('min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l')
    ->merge([
        'as' => $as,
        'data-slot' => 'toggle-group-item',
        'variant' => $variant,
        'size' => $size,
        'data-variant' => $variant,
        'data-size' => $size,
        'tab-index' => '-1',
        'x-data' => "toggleGroupItem($componentParams)",
    ]))

<x-lumen::toggle :attributes="$attributes">
    {{ $slot }}
</x-lumen::toggle>

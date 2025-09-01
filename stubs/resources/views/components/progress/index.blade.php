@props([
    'as' => 'div',
    'value' => 0,
    'max' => 100,
])

@php($componentParams = Js::from(compact('value', 'max')))

@php($attributes = $attributes
    ->twMerge('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full')
    ->merge([
        'as' => $as,
        'role' => 'progressbar',
        'data-slot' => 'progress',
        'x-data' => "progress($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

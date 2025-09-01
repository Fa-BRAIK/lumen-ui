@props([
    'as' => 'div',
    'loop' => true,
])

@php($componentParams = Js::from(compact('loop')))

@php($attributes = $attributes
    ->twMerge('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]')
    ->merge([
        'data-slot' => 'tabs-list',
        'role' => 'tablist',
        'tabindex' => '0',
        'x-data' => "tabsList($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

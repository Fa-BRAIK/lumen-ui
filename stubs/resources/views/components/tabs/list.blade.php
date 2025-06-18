@props([
    'loop' => true,
])

@php($attributes = $attributes
    ->twMerge('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]')
    ->merge([
        'data-slot' => 'tabs-list',
        'role' => 'tablist',
        'x-tab:list' => Js::from(compact('loop')),
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

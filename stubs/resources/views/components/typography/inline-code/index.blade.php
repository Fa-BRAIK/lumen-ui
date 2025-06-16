@props([
    'as' => 'code',
])

@php($attributes = $attributes
    ->twMerge('bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

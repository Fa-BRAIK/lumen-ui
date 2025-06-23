@props([
    'as' => 'ol',
])

@php($attributes = $attributes
    ->twMerge('text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5')
    ->merge([
        'as' => $as,
        'data-slot' => 'breadcrumb-list',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

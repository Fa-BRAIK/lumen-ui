@use('Nuxtifyts\Lumen\Support\ClassVarianceAuthority')

@props([
    'as' => 'div',
    'variant' => null,
])

@php($alertVariants = new class(
    baseClasses: 'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    config: [
        'variants' => [
            'variant' => [
                'default' => 'bg-card text-card-foreground',
                'destructive' => 'bg-destructive bg-card [&>svg]:text-current text-destructive *:data-[slot=alert-description]:text-destructive/90'
            ],
        ],
        'defaultVariants' => [
            'variant' => 'default',
        ],
    ],
) extends ClassVarianceAuthority {})

@php($attributes = $attributes
    ->twMerge($alertVariants(variant: $variant))
    ->merge([
        'as' => $as,
        'data-slot' => 'alert',
        'role' => 'alert',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

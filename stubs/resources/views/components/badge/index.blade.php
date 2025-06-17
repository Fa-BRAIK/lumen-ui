@props([
    'as' => 'span',
    'variant' => null,
])

@use('Nuxtifyts\Lumen\Support\ClassVarianceAuthority')

@php($badgeVariants = new class (
    baseClasses: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    config: [
        'variants' => [
            'variant' => [
                'default' => 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                'secondary' => 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                'destructive' => 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                'outline' => 'text-foreground',
            ],
        ],
        'defaultVariants' => [
            'variant' => 'default',
        ],
    ],
) extends ClassVarianceAuthority {})

@php($attributes = $attributes
    ->twMerge($badgeVariants(variant: $variant))
    ->merge(['as' => $as, 'data-slot' => 'badge']))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

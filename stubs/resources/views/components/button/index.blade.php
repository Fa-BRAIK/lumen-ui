@props([
    'variant' => null,
    'size' => null,
    'type' => 'button',
])

<?php
use Nuxtifyts\Lumen\Support\ClassVarianceAuthority;

$buttonVariants = new class (
    baseClasses: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    config: [
        'variants' => [
            'variant' => [
                'default' => 'bg-primary text-primary-foreground hover:bg-primary/90',
                'destructive' => 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                'outline' => 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
                'secondary' => 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                'ghost' => 'hover:bg-accent hover:text-accent-foreground',
                'link' => 'text-primary underline-offset-4 hover:underline',
            ],
            'size' => [
                'base' => 'h-10 px-4 py-2',
                'sm' => 'h-9 rounded-md px-3 text-sm',
                'lg' => 'h-11 rounded-md px-8 text-sm',
                'icon' => 'h-10 w-10',
            ],
        ],
        'defaultVariants' => [
            'variant' => 'default',
            'size' => 'base',
        ],
    ],
) extends ClassVarianceAuthority {}; ?>

<button
    {{ 
        $attributes
            ->twMerge($buttonVariants(variant: $variant, size: $size))
            ->merge([
                'type' => $type,
            ])
    }}
>
    {{ $slot }}
</button>

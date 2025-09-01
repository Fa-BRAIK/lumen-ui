@use('Lumen\Support\ClassVarianceAuthority')

@props([
    'as' => 'button',
    'size' => null,
    'variant' => null,
    'defaultPressed' => false,
    'disabled' => false,
])

@php($toggleVariants = new class(
    baseClasses: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
    config: [
        'variants' => [
            'variant' => [
                'default' => 'bg-transparent',
                'outline' => 'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
            ],
            'size' => [
                'base' => 'h-9 px-2 min-w-9',
                'sm' => 'h-8 px-1.5 min-w-8',
                'lg' => 'h-10 px-2.5 min-w-10',
            ],
        ],
        'defaultVariants' => [
            'variant' => 'default',
            'size' => 'base',
        ],
    ],
) extends ClassVarianceAuthority {})

@php($componentParams = Js::from(compact('defaultPressed', 'disabled')))

@php($attributes = $attributes
    ->twMerge($toggleVariants(variant: $variant, size: $size))
    ->merge([
        'as' => $as,
        'type' => 'button',
        'role' => 'toggle',
        'data-slot' => $dataSlot = $attributes->get('data-slot', 'toggle'),
    ])
    ->merge($dataSlot === 'toggle' ? ['x-data' => "toggle($componentParams)"] : []))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

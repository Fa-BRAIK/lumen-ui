@props([
    'as' => 'button',
    'size' => null,
    'variant' => null,
    'defaultPressed' => false,
    'disabled' => false,
])

@use('Nuxtifyts\Lumen\Support\ClassVarianceAuthority')

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

@php($attributes = $attributes
    ->twMerge($toggleVariants(variant: $variant, size: $size))
    ->merge([
        'as' => $as,
        'type' => 'button',
        'role' => 'toggle',
        'data-slot' => $dataSlot = $attributes->get('data-slot', 'toggle'),
    ])
    ->merge($dataSlot === 'toggle' ? ['x-toggle' => Js::from(compact('defaultPressed', 'disabled'))] : []))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@pushLumenScriptsOnce
<script>
    document.addEventListener('alpine:init', () => {
        const handleRoot = (el, Alpine, { defaultPressed, disabled }) => {
            Alpine.bind(el, () => ({
                ':aria-pressed'() {
                    return this.__value ? 'true' : 'false';
                },
                ':disabled'() {
                    return this.disabled ? 'disabled' : undefined;
                },
                ':data-disabled'() {
                    return this.disabled ? 'disabled' : undefined;
                },
                ':data-state'() {
                    return this.__value ? 'on' : 'off';
                },
                '@click'() {
                    if (! this.disabled) {
                        this.__onValueChange(!this.__value);
                    }
                },
                '@keydown.enter.prevent'() {
                    if (! this.disabled) {
                        this.__onValueChange(!this.__value);
                    }
                },
                'x-data'() {
                    return {
                        __value: defaultPressed,
                        defaultPressed,
                        disabled,

                        get pressed() {
                            return this.__value;
                        },

                        __onValueChange(value) {
                            this.__value = value;
                        },
                    };
                },
                'x-modelable': '__value',
            }));
        };

        Alpine.directive('toggle', (e, {value, expression}, {Alpine, evaluate}) => {
            const params = expression ? evaluate(expression) : {};

            if (! value) handleRoot(e, Alpine, params);
            else {
                console.warn(`Unknown checkbox directive value: ${value}`);
            }
        });
    });
</script>
@endPushLumenScriptsOnce

@props([
    'as' => 'div',
    'defaultOpen' => false,
    'dir' => 'ltr',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'x-popover' => Js::from(compact('defaultOpen')),
        'style' => Arr::toCssStyles([
            '--lumen-popover-content-transform-origin: ' . ($dir === 'rtl' ? 'right' : 'left'),
        ])
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@pushLumenScriptsOnce
<script type="text/javascript" data-navigate-once="true">
    document.addEventListener(typeof Alpine === 'undefined' ? 'alpine:init' : 'livewire:navigated', () => {
        const stateProps = {
            ':data-state'() {
                return this.__open
                    ? this.delayDuration > 0 ? 'delayed-open' : 'instant-open'
                    : 'closed';
            },
        };
        
        const handleRoot = (el, Alpine, { defaultOpen, delayDuration, closeDelay }) => {
            Alpine.bind(el, () => ({
                '@keydown.escape.window': '__onOpenChange(false, true)',
                'x-data'() {
                    return {
                        __open: defaultOpen,
                        defaultOpen,

                        get __trigger() {
                            return this.$refs.trigger;
                        },

                        get __content() {
                            return this.$refs.content;
                        },

                        __onOpenChange(newValue) {
                            this.__open = newValue;
                        },

                        init() {
                            this.$el.removeAttribute('x-popover');
                        },
                    };
                },
                'x-modelable': '__open',
            }));
        };

        const handleTrigger = (el, Alpine) => {
            Alpine.bind(el, () => ({
                ...stateProps,
                '@click': '__onOpenChange(true)',
                'x-ref': 'trigger',
                'x-data': '',
                'x-init'() {
                    this.$el.removeAttribute('x-popover:trigger');
                },
            }));
        };

        const handleContent = (el, Alpine, { side, align, sideOffset }) => {
            Alpine.bind(el, () => ({
                ...stateProps,
                ':data-side': 'side',
                ':data-align': 'align',
                'x-show': '__open',
                'x-transition:enter': 'ease-in duration-300 transition-opacity',
                'x-transition:enter-start': 'opacity-0',
                'x-transition:enter-end': 'opacity-100',
                'x-transition:leave': 'ease duration-150',
                'x-transition:leave-start': 'opacity-100',
                'x-transition:leave-end': 'opacity-0',
                'x-anchorplus'() {
                    return {
                        reference: this.__trigger,
                        placement: this.side + (this.align === 'center' ? '' : `-${this.align}`),
                        sideOffset: this.sideOffset,
                    };
                },
                '@click.outside'() {
                    if (this.__open) {
                        this.__onOpenChange(false);
                    }
                },
                'x-data'() {
                    return {
                        side,
                        align,
                        sideOffset,

                        init() {
                            this.$el.removeAttribute('x-popover:content');
                        }
                    };
                }
            }));
        };

        Alpine.directive('popover', (el, {value, expression}, {Alpine, evaluate}) => {
            const params = expression ? evaluate(expression) : {};

            if (! value) handleRoot(el, Alpine, params);
            else if (value === 'trigger') handleTrigger(el, Alpine, params);
            else if (value === 'content') handleContent(el, Alpine, params);
            else {
                console.warn(`Unknown popover directive value: ${value}`);
            }
        }).before('bind');
    }, { once: true });
</script>
@endPushLumenScriptsOnce


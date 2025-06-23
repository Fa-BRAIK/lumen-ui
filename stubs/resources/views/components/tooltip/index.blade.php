@use('Nuxtifyts\Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => 'div',
    'delayDuration' => 0,
    'skipDelayDuration' => 0,
    'defaultOpen' => false,
])

@php(throw_unless(
    is_numeric($delayDuration) && $delayDuration >= 0,
    InvalidComponentException::invalidTooltipDelayDuration()
))

@php($attributes = $attributes
    ->twMerge('')
    ->merge([
        'as' => $as,
        'data-slot' => 'tooltip',
        'x-tooltip' => Js::from(compact('delayDuration', 'skipDelayDuration', 'defaultOpen'))
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@pushLumenScriptsOnce
<script type="text/javascript" data-navigate-once="true">
    document.addEventListener(typeof Alpine === 'undefined' ? 'alpine:init' : 'livewire:navigated', () => {
        const handleRoot = (el, Alpine, { delayDuration, skipDelayDuration, defaultOpen }) => {
            Alpine.bind(el, () => ({
                '@keydown.escape.window'() {
                    if (! this.__open) return;

                    this.__onOpenChange(false);
                },
                '@keydown.space.window'(event) {
                    if (! this.__open) return;

                    event.preventDefault();

                    this.__onOpenChange(!this.__open);
                },
                '@keydown.enter.window'() {
                    if (! this.__open) return;

                    this.__onOpenChange(!this.__open);
                },
                'x-data'() {
                    return {
                        __open: defaultOpen,
                        defaultOpen,
                        delayDuration,
                        skipDelayDuration,

                        __onOpenChange(newValue) {
                            this.__open = newValue;
                        },

                        get __button() {
                            return this.$refs.button;
                        },

                        get __arrow() {
                            return this.$refs.arrow;
                        },

                        init() {
                            this.$el.removeAttribute('x-tooltip');

                            Alpine.bind(
                                this.$el.querySelector('[data-slot="tooltip-arrow"]'),
                                () => ({
                                    'x-ref': 'arrow'
                                })
                            );
                        }
                    }
                },
                'x-modelable': '__open',
            }));
        };

        const handleTrigger = (el, Alpine, {}) => {
            Alpine.bind(el, () => ({
                '@mouseenter'() {
                    this.__onOpenChange(true);
                },
                '@mouseleave'() {
                    this.__onOpenChange(false);
                },
                'x-ref': 'button',
                'x-data': '',
                'x-init'() {
                    this.$el.removeAttribute('x-tooltip:trigger');
                },
            }));
        };

        const handleContent = (el, Alpine, { side, align, sideOffset, avoidCollisions, arrow }) => {
            Alpine.bind(el, () => ({
                'x-show'() {
                    return this.__open;
                },
                'x-transition:enter': 'ease-in duration-300 transition-opacity',
                'x-transition:enter-start': 'opacity-0',
                'x-transition:enter-end': 'opacity-100',
                'x-transition:leave': 'ease duration-150',
                'x-transition:leave-start': 'opacity-100',
                'x-transition:leave-end': 'opacity-0',
                'x-anchorplus'() {
                    return {
                        reference: this.__button,
                        placement: this.side + (this.align === 'center' ? '' : `-${this.align}`),
                        sideOffset: this.sideOffset,
                        arrowEl: this.arrow ? this.$refs.arrow : undefined
                    };
                },
                'x-data'() {
                    return {
                        side,
                        align,
                        sideOffset,
                        avoidCollisions,
                        arrow,

                        init() {
                            this.$el.removeAttribute('x-tooltip:content');
                        }
                    };
                },
            }));
        };

        Alpine.directive('tooltip', (el, {value, expression}, {Alpine, evaluate}) => {
            const params = expression ? evaluate(expression) : {};

            if (! value) handleRoot(el, Alpine, params);
            else if (value === 'trigger') handleTrigger(el, Alpine, params);
            else if (value === 'content') handleContent(el, Alpine, params);
            else {
                console.warn(`Unknown tooltip directive value: ${value}`);
            }
        });
    }, { once: true });
</script>
@endPushLumenScriptsOnce

@props([
    'as' => 'div',
    'defaultOpen' => false,
    'modal' => true,
    'dir' => 'ltr',
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu',
        'style' => Arr::toCssStyles([
            '--lumen-dropdown-menu-available-height: calc(100vh - 2rem)',
            '--lumen-dropdown-menu-transform-origin:' . ($dir === 'rtl' ? 'right' : 'left'),
        ]),
        'x-dropdown-menu' => Js::from(compact('defaultOpen', 'dir', 'modal'))
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@pushLumenScriptsOnce
<script type="text/javascript" data-navigate-once="true">
    document.addEventListener(typeof Alpine === 'undefined' ? 'alpine:init' : 'livewire:navigated', () => {
        const DROPDOWN_MENU_COMPONENT_ID = 'dropdown-menu';
        
        const handleRoot = (el, Alpine, { defaultOpen, dir, modal }) => {
            Alpine.bind(el, () => ({
                'x-id'() {
                    return [DROPDOWN_MENU_COMPONENT_ID];
                },
                '@keydown.escape'() {
                    if (this.__open) {
                        this.__onOpenChange(false);
                    }
                },
                '@click.window'() {
                    if (this.__open) {
                        this.__onOpenChange(false);
                    }
                },
                'x-data'() {
                    return {
                        __open: defaultOpen,
                        defaultOpen,
                        dir,
                        modal,

                        get __trigger() {
                            return this.$refs.trigger;
                        },

                        __onOpenChange(newValue) {
                            this.$nextTick(() => {
                                this.__open = newValue;
                            });
                        },

                        __makeTriggerId(baseId) {
                            return `${baseId}-trigger`;
                        },

                        __makeContentId(baseId) {
                            return `${baseId}-content`;
                        },

                        init() {
                            this.$el.removeAttribute('x-dropdown-menu');

                            this.$watch('__open', (newValue) => {
                                if (this.modal) {
                                    if (newValue) {
                                        document.body.setAttribute('data-scroll-locked', '1');
                                        document.body.style.pointerEvents = 'none';
                                    } else {
                                        document.body.removeAttribute('data-scroll-locked');
                                        document.body.style.pointerEvents = '';
                                    }
                                }
                            });
                        }
                    };
                },
                'x-modelable': '__open',
            }));
        };

        const handleTrigger = (el, Alpine) => {
            Alpine.bind(el, () => ({
                ':id'() {
                    return this.__makeTriggerId(this.$id(DROPDOWN_MENU_COMPONENT_ID));
                },
                ':aria-expanded'() {
                    return this.__open ? 'true' : 'false';
                },
                ':aria-controls'() {
                    return this.__open 
                        ? this.__makeContentId(this.$id(DROPDOWN_MENU_COMPONENT_ID))
                        : undefined;
                },
                'x-ref': 'trigger',
                'x-data': '',
                'x-init'() {
                    this.$el.removeAttribute('x-dropdown-menu:trigger');
                },
                '@click'() {
                    this.__onOpenChange(!this.__open);
                }
            }));
        };

        const handleContent = (el, Alpine, { side, align, sideOffset }) => {
            Alpine.bind(el, () => ({
                'x-show'() {
                    return this.__open;
                },
                ':data-state'() {
                    return this.__open ? 'open' : 'closed';
                },
                ':data-side'() {
                    return side;
                },
                ':data-align'() {
                    return align;
                },
                ':id'() {
                    return this.__makeContentId(this.$id(DROPDOWN_MENU_COMPONENT_ID));
                },
                ':aria-labelledby'() {
                    return this.__makeTriggerId(this.$id(DROPDOWN_MENU_COMPONENT_ID));
                },
                'x-transition:enter': 'transition ease-in duration-150',
                'x-transition:enter-start': 'opacity-0 scale-95 translate-y-2',
                'x-transition:enter-end': 'opacity-100 scale-100 translate-y-0',
                'x-transition:leave': 'transition ease duration-150',
                'x-transition:leave-start': 'opacity-100 scale-100 translate-y-0',
                'x-transition:leave-end': 'opacity-0 scale-95 translate-y-2',
                'x-ref': 'content',
                'x-anchorplus'() {
                    return {
                        reference: this.__trigger,
                        placement: this.side + (this.align === 'center' ? '' : `-${this.align}`),
                        sideOffset: this.sideOffset,
                    };
                },
                '@keydown.down'() {
                    if (this.__open) {
                        if (this.$focus.getNext()) this.$focus.next();
                        else if (this.$focus.focused() === el) {
                            this.$focus.first();
                        }
                    }
                },
                '@keydown.up'() {
                    if (this.__open) {
                        if (this.$focus.getPrevious()) this.$focus.previous();
                        else if (this.$focus.focused() === el) {
                            this.$focus.last();
                        }
                    }
                },
                '@keydown.escape'() {
                    if (this.__open) {
                        this.__onOpenChange(false);
                        this.$focus.focus(this.__trigger);
                    }
                },
                'x-data'() {
                    return {
                        side,
                        align,
                        sideOffset,

                        init() {
                            this.$el.removeAttribute('x-dropdown-menu:content');

                            this.$watch('__open', (newValue) => {
                                if (newValue) {
                                    this.$nextTick(() => {
                                        this.$focus.focus(this.$el);
                                    });
                                }
                            });
                        },
                    };
                }
            }));
        };

        const handleItem = (el, Alpine, { disabled }) => {
            Alpine.bind(el, () => ({
                '@mouseenter'() {
                    this.$focus.focus(el);
                },
                '@mouseleave'() {
                    if (this.$focus.focused() === el) {
                        el.blur();
                    }
                },
                ':data-disabled'() {
                    return this.disabled ? 'true' : undefined;
                },
                ':aria-disabled'() {
                    return this.disabled ? 'true' : undefined;
                },
                'x-data'() {
                    return {
                        disabled,

                        init() {
                            this.$el.removeAttribute('x-dropdown-menu:item');
                        },
                    };
                },
            }));
        };

        Alpine.directive('dropdown-menu', (el, {value, expression}, {Alpine, evaluate}) => {
            const params = expression ? evaluate(expression) : {};

            if (! value) handleRoot(el, Alpine, params);
            else if (value === 'trigger') handleTrigger(el, Alpine, params);
            else if (value === 'content') handleContent(el, Alpine, params);
            else if (value === 'item') handleItem(el, Alpine, params);
            else {
                console.warn(`Unknown tooltip directive value: ${value}`);
            }
        });
    }, { once: true });
</script>
@endPushLumenScriptsOnce

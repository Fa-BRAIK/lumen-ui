@use('Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => 'div',
    // The variant applied to the toggle buttons, can be 'default' or 'outline'
    'variant' => 'default',
    // The size of the toggle buttons, can be 'sm', 'base' or 'lg'
    'size' => 'base',
    // The type of toggle group, can be 'single' or 'multiple'
    'type' => 'multiple',
    // The default value for the toggle group, 
    'defaultValue' => [],
    // When set to false, navigating using arrow keys will be disabled 
    'rovingFocus' => true,
    // The orientation of the toggle group, can be 'horizontal' or 'vertical'
    'orientation' => 'horizontal',
    // The direction of the toggle group, can be 'ltr' or 'rtl'
    'dir' => 'ltr',
    // When set to true, the toggle group will loop around when navigating with arrow keys
    'loop' => true,
    // When set to true the toggle group will be disabled
    'disabled' => false
])

@php(throw_unless(
    in_array($type, ['single', 'multiple']),
    InvalidComponentException::invalidToggleGroupType()
))

@php($attributes = $attributes
    ->twMerge('group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs')
    ->merge([
        'as' => $as,
        'data-slot' => 'toggle-group',
        'data-variant' => $variant,
        'data-size' => $size,
        'tabindex' => '-1',
        "x-toggle-group.$type" => Js::from(compact('defaultValue', 'rovingFocus', 'orientation', 'dir', 'loop', 'disabled'))
    ])
    ->exceptProps(['default-value']))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@pushLumenScriptsOnce
<script type="text/javascript" data-navigate-once="true">
    document.addEventListener(typeof Alpine === 'undefined' ? 'alpine:init' : 'livewire:navigated', () => {
        const commonProps = {
            ':dir'() {
                return this.dir;
            },
            ':data-orientation'() {
                return this.orientation;
            },
            ':aria-orientation'() {
                return this.orientation;
            },
        };

        const handleRoot = (el, Alpine, type, { defaultValue, rovingFocus, orientation, dir, loop, disabled }) => {
            Alpine.bind(el, () => ({
                ...commonProps,
                '@keydown.right'() {
                    if (this.__disabled || ! this.rovingFocus || this.orientation !== 'horizontal') {
                        return;
                    }

                    if (this.$focus.getNext()) {
                        this.$focus.next();
                    } else if (this.loop) {
                        this.$focus.first();
                    }
                },
                '@keydown.left'() {
                    if (this.__disabled || ! this.rovingFocus || this.orientation !== 'horizontal') {
                        return;
                    }

                    if (this.$focus.getPrevious()) {
                        this.$focus.previous();
                    } else if (this.loop) {
                        this.$focus.last();
                    }
                },
                'x-data'() {
                    return {
                        __value: defaultValue,
                        __disabled: disabled,
                        defaultValue,
                        rovingFocus,
                        orientation,
                        dir,
                        loop,
                        type,

                        __onValueChange(newValue) {
                            if (this.__disabled) {
                                return;
                            }

                            if (this.type === 'single') {
                                this.__value = [newValue];
                            } else {
                                this.__value = this.__value.includes(newValue)
                                    ? this.__value.filter(item => item !== newValue)
                                    : [...new Set([...this.__value, newValue])];
                            }
                        },
    
                        init() {
                            this.$el.removeAttribute(`x-toggle-group.${type}`);
                        }
                    }
                },
                'x-modelable': '__value',
            }));
        };

        const handleItem = (el, Alpine, type, { value, disabled, orientation, dir }) => {
            Alpine.bind(el, () => ({
                ...commonProps,
                ':data-state'() {
                    return this.selected ? 'on' : 'off';
                },
                ':aria-checked'() {
                    return this.selected ? 'true' : 'false';
                },
                ':data-disabled'() {
                    return this.disabled ? true : undefined;
                },
                ':disabled'() {
                    return this.disabled ? 'disabled' : undefined;
                },
                '@click'() {
                    if (! this.disabled) {
                        this.__onValueChange(this.value);
                    }
                },
                '@keydown.enter.prevent'() {
                    if (! this.disabled) {
                        this.__onValueChange(this.value);
                    }
                },
                'x-data'() {
                    return {
                        value,
                        disabled,
                        type,
                        orientation,
                        dir,

                        get selected() {
                            return this.__value.includes(this.value);
                        },

                        init() {
                            this.$el.removeAttribute(`x-toggle-group.${type}:item`);   
                        }
                    }
                }
            }));
        };

        Alpine.directive('toggle-group', (el, {value, modifiers, expression}, {Alpine, evaluate}) => {
            const type = modifiers[0].split(':')[0];
            const params = expression ? evaluate(expression) : {};

            if (! ['single', 'multiple'].includes(type)) {
                throw new Error(`Invalid toggle group type: ${type}. Expected 'single' or 'multiple'.`);
            }

            if (! value) handleRoot(el, Alpine, type, params);
            else if (value === 'item') handleItem(el, Alpine, type, params);
            else {
                console.warn(`Unknown toggle group directive value: ${value}`);
            }
        }).before('bind');
    }, { once: true });
</script>
@endPushLumenScriptsOnce

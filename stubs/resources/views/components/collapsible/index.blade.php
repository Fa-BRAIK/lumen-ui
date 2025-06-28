@props([
    'as' => 'div',
    'defaultOpen' => false,
    'disabled' => false,
])
@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'collapsible',
        'x-collapsible' => Js::from(compact('defaultOpen', 'disabled'))
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@pushLumenScriptsOnce
<script type="text/javascript" data-navigate-once="true">
    document.addEventListener(typeof Alpine === 'undefined' ? 'alpine:init' : 'livewire:navigated', () => {
        const stateProps = {
            ':data-state': '__open ? "open" : "closed"',
            ':data-disabled': 'disabled'
        };

        const handleRoot = (el, Alpine, { defaultOpen, disabled }) => {
            Alpine.bind(el, {
                ...stateProps,
                'x-data'() {
                    return {
                        __open: defaultOpen,
                        disabled,

                        __onValueChange(value) {
                            if (this.disabled) return;

                            this.__open = value;
                        },

                        init() {
                            this.$el.removeAttribute('x-collapsible');
                        }
                    };
                }
            });
        };

        const handleTrigger = (el, Alpine) => {
            Alpine.bind(el, {
                ...stateProps,
                '@click': '__onValueChange(!__open)',
                'x-data': '',
                'x-init'() {
                    this.$el.removeAttribute('x-collapsible:trigger');
                }
            });
        };

        const handleContent = (el, Alpine) => {
            Alpine.bind(el, {
                ...stateProps,
                'x-show': '__open',
                'x-collapse': '',
                'x-data': '',
                'x-init'() {
                    this.$el.removeAttribute('x-collapsible:content');
                }                
            })
        };

        Alpine.directive('collapsible', (el, {value, expression}, {Alpine, evaluate}) => {
            const params = expression ? evaluate(expression) : {};

            if (! value) handleRoot(el, Alpine, params);
            else if (value === 'trigger') handleTrigger(el, Alpine);
            else if (value === 'content') handleContent(el, Alpine);
            else {
                console.warn(`Unknown collapsible directive value: ${value}`);
            }
        });
    }, { once: true });
</script>
@endPushLumenScriptsOnce

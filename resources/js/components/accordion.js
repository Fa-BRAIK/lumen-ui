export const registerComponent = () => {
    const commonItemProps = {
        ':data-state': 'selected ? "open" : "closed"',
        ':data-disabled': 'disabled || __disabled',
    }

    const commonProps = {
        ':data-orientation': 'orientation',
    }

    Alpine.data(
        'accordion',
        ({
            defaultValue,
            type,
            orientation,
            dir,
            collapsible,
            loop,
            disabled,
        }) => ({
            __value: defaultValue,
            __disabled: disabled,
            defaultValue,
            type,
            orientation,
            dir,
            loop,
            collapsible,

            __onItemClick(value) {
                if (this.disabled || this.__disabled) return

                if (this.type === 'single') this.__handleItemClickSinge(value)
                else this.__handleItemClickMultiple(value)
            },

            __handleItemClickSinge(value) {
                if (this.disabled || this.__disabled) return

                this.__value = this.__value.includes(value)
                    ? this.collapsible
                        ? []
                        : [value]
                    : [value]
            },

            __handleItemClickMultiple(value) {
                if (this.disabled || this.__disabled) return

                if (this.__value.includes(value)) {
                    this.__value = this.__value.filter((item) => item !== value)
                } else {
                    this.__value.push(value)
                }
            },

            __focusPreviousItem() {
                if (this.__disabled) return

                const previous = this.$focus.getPrevious()
                if (previous) {
                    this.$focus.previous()
                } else if (this.loop) {
                    const last = this.$focus.getLast()
                    this.$focus.last()
                }
            },

            __focusNextItem() {
                if (this.__disabled) return

                const next = this.$focus.getNext()
                if (next) {
                    this.$focus.next()
                } else if (this.loop) {
                    const first = this.$focus.getFirst()
                    this.$focus.first()
                }
            },

            init() {
                Alpine.bind(this.$el, {
                    ...commonProps,
                    ':data-dir': 'dir',
                    ':data-type': 'type',
                    ':data-collapsible': 'collapsible',
                    ':data-disabled': '__disabled',
                    '@keydown.down.prevent': '__focusNextItem',
                    '@keydown.up.prevent': '__focusPreviousItem',
                    'x-modelable': '__value',
                })
            },
        }),
    )

    Alpine.data('accordionItem', ({ value, disabled }) => ({
        disabled,
        value,

        get selected() {
            return this.__value.includes(this.value)
        },

        init() {
            Alpine.bind(this.$el, {
                ...commonProps,
                ...commonItemProps,
                ':data-value': 'value',
                ':data-disabled': 'disabled || __disabled',
                ':disabled': 'disabled || __disabled',
            })
        },
    }))

    Alpine.data('accordionTrigger', () => ({
        init() {
            Alpine.bind(this.$el, {
                ...commonProps,
                ...commonItemProps,
                '@click': '__onItemClick(value)',
                'x-data': '',
                'x-init': '$el.removeAttribute("x-accordion:trigger")',
            })
        },
    }))

    Alpine.data('accordionContent', () => ({
        init() {
            Alpine.bind(this.$el, {
                ...commonProps,
                ...commonItemProps,
                'x-show': 'selected',
                'x-collapse': '',
                'x-data': '',
                'x-init': '$el.removeAttribute("x-accordion:content")',
            })
        },
    }))
}

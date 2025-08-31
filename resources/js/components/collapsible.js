export const registerComponent = () => {
    const stateProps = {
        ':data-state': '__open ? "open" : "closed"',
        ':data-disabled': 'disabled',
    }

    Alpine.data('collapsible', ({ defaultOpen, disabled }) => ({
        __open: defaultOpen,
        disabled,

        __onValueChange(value) {
            if (this.disabled) return

            this.__open = value
        },

        init() {
            Alpine.bind(this.$el, {
                ...stateProps,
            })
        },
    }))

    Alpine.data('collapsibleTrigger', () => ({
        init() {
            Alpine.bind(this.$el, {
                ...stateProps,
                '@click': '__onValueChange(!__open)',
                'x-data': '',
            })
        },
    }))

    Alpine.data('collapsibleContent', () => ({
        init() {
            Alpine.bind(this.$el, {
                ...stateProps,
                'x-show': '__open',
                'x-collapse': '',
                'x-data': '',
            })
        },
    }))
}

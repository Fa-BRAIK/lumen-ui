export const registerComponent = () => {
    const stateProps = {
        ':data-state'() {
            return this.__open
                ? this.delayDuration > 0
                    ? 'delayed-open'
                    : 'instant-open'
                : 'closed'
        },
    }

    Alpine.data('popover', ({ defaultOpen, delayDuration, closeDelay }) => ({
        __main: undefined,
        __open: defaultOpen,
        defaultOpen,
        delayDuration,
        closeDelay,

        get __trigger() {
            return this.__main._x_lumen_trigger
        },

        __onOpenChange(newValue) {
            this.__open = newValue
        },

        init() {
            this.__main = this.$el
            Alpine.bind(this.$el, {
                '@keydown.escape.window': '__onOpenChange(false, true)',
                'x-modelable': '__open',
            })
        },
    }))

    Alpine.data('popoverTrigger', () => ({
        init() {
            this.__main._x_lumen_trigger = this.$el
            Alpine.bind(this.$el, {
                ...stateProps,
                '@click': '__onOpenChange(true)',
            })
        },
    }))

    Alpine.data('popoverContent', ({ side, align, sideOffset }) => ({
        side,
        align,
        sideOffset,

        init() {
            Alpine.bind(this.$el, {
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
                        placement:
                            this.side +
                            (this.align === 'center' ? '' : `-${this.align}`),
                        sideOffset: this.sideOffset,
                    }
                },
                '@click.outside'() {
                    if (this.__open) {
                        this.__onOpenChange(false)
                    }
                },
            })
        },
    }))
}

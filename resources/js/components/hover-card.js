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

    Alpine.data('hoverCard', ({ defaultOpen, delayDuration, closeDelay }) => ({
        __main: undefined,
        __open: defaultOpen,
        __timeouts: new Map(),
        defaultOpen,
        delayDuration,
        closeDelay,

        get __trigger() {
            return this.__main._x_lumen_trigger
        },

        __onOpenChange(newValue, skipDelay = false) {
            if (newValue && !skipDelay && this.delayDuration > 0) {
                this.__clearTimeout('close')
                this.__setTimeout(
                    'open',
                    () => {
                        this.__open = true
                    },
                    this.delayDuration,
                )
            } else if (newValue) {
                this.__clearTimeout('open')
                this.__clearTimeout('close')
                this.__open = true
            } else if (!skipDelay && this.closeDelay > 0) {
                this.__clearTimeout('open')
                this.__setTimeout(
                    'close',
                    () => {
                        this.__open = false
                    },
                    this.closeDelay,
                )
            } else {
                this.__clearTimeout('open')
                this.__clearTimeout('close')
                this.__open = false
            }
        },

        __setTimeout(key, callback, delay) {
            this.__clearTimeout(key)

            if (delay <= 0) {
                callback()
                return
            }

            const timeoutId = setTimeout(() => {
                callback()
                this.__timeouts.delete(key)
            }, delay)

            this.__timeouts.set(key, timeoutId)
        },

        __clearTimeout(key) {
            if (this.__timeouts.has(key)) {
                clearTimeout(this.__timeouts.get(key))
                this.__timeouts.delete(key)
            }
        },

        init() {
            this.__main = this.$el

            Alpine.bind(this.$el, {
                '@keydown.escape.window': '__onOpenChange(false, true)',
                'x-modelable': '__open',
            })
        },

        destroy() {
            this.__timeouts.forEach((timeoutId) => clearTimeout(timeoutId))
            this.__timeouts.clear()
        },
    }))

    Alpine.data('hoverCardTrigger', () => ({
        init() {
            this.__main._x_lumen_trigger = this.$el
            Alpine.bind(this.$el, {
                ...stateProps,
                '@mouseenter': '__onOpenChange(true)',
                '@mouseleave': '__onOpenChange(false)',
            })
        },
    }))

    Alpine.data('hoverCardContent', ({ side, align, sideOffset }) => ({
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
            })
        },
    }))
}

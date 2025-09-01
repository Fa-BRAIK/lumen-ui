export const registerComponent = () => {
    const DIALOG_COMPONENT_ID = 'dialog'

    const stateProps = {
        ':data-state'() {
            return this.__open ? 'open' : 'closed'
        },
    }

    Alpine.data('dialog', ({ defaultOpen, modal }) => ({
        __main: undefined,
        __open: defaultOpen,
        __modal: modal,
        defaultOpen,

        get __dialog() {
            return this.__main._x_lumen_dialog
        },

        get __trigger() {
            return this.__main._x_lumen_trigger
        },

        __onOpenChange(newValue) {
            this.__open = newValue
        },

        __makeTitleId() {
            return this.$id(DIALOG_COMPONENT_ID + '-title')
        },

        __makeDescriptionId() {
            return this.$id(DIALOG_COMPONENT_ID + '-description')
        },

        init() {
            this.__main = this.$el

            this.$watch('__open', (newValue) => {
                if (newValue) {
                    this.__dialog?.showModal()
                } else {
                    const duration =
                        Array.from(this.__dialog?.classList || [])
                            .find((cls) => cls.startsWith('duration-'))
                            ?.split('-')[1] || 0

                    setTimeout(() => this.__dialog?.close(), duration)
                }
            })

            Alpine.bind(this.$el, {
                ...stateProps,
                'x-id'() {
                    return [DIALOG_COMPONENT_ID]
                },
                'x-modelable': '__open',
            })
        },
    }))

    Alpine.data('dialogContent', () => ({
        init() {
            this.__main._x_lumen_dialog = this.$el

            Alpine.bind(this.$el, {
                ...stateProps,
                ':id'() {
                    return this.$id(DIALOG_COMPONENT_ID + '-dialog')
                },
                '@keydown.escape.window'() {
                    if (this.__open) this.__onOpenChange(false)
                },
                '@click'() {
                    const rect = this.__dialog?.getBoundingClientRect()

                    if (!rect) return

                    const clientX =
                        'clientX' in event
                            ? event.clientX
                            : event.touches[0]?.clientX
                    const clientY =
                        'clientY' in event
                            ? event.clientY
                            : event.touches[0]?.clientY

                    const top = rect.top
                    const right = rect.right
                    const bottom = rect.bottom
                    const left = rect.left

                    if (
                        rect.left > clientX ||
                        clientX > rect.right ||
                        rect.top > clientY ||
                        clientY > rect.bottom
                    ) {
                        if (!this.__modal) return

                        this.__onOpenChange(false)
                    }
                },
                'x-show': '__open',
                'x-transition:enter':
                    'transition backdrop:transition ease-out duration-200',
                'x-transition:enter-start':
                    'opacity-0 scale-90 backdrop:opacity-0',
                'x-transition:enter-end':
                    'opacity-100 scale-100 backdrop:opacity-100',
                'x-transition:leave':
                    'transition backdrop:transition ease-in duration-200',
                'x-transition:leave-start':
                    'opacity-100 scale-100 backdrop:opacity-100',
                'x-transition:leave-end':
                    'opacity-0 scale-90 backdrop:opacity-0',
            })
        },
    }))

    Alpine.data('dialogTrigger', () => ({
        init() {
            this.__main._x_lumen_trigger = this.$el

            Alpine.bind(this.$el, {
                ...stateProps,
                ':id'() {
                    return this.$id(DIALOG_COMPONENT_ID + '-trigger')
                },
                '@click': '__onOpenChange(true)',
            })
        },
    }))

    Alpine.data('dialogClose', () => ({
        init() {
            Alpine.bind(this.$el, {
                ':id'() {
                    return this.$id(DIALOG_COMPONENT_ID + '-close')
                },
                '@click': '__onOpenChange(false)',
            })
        },
    }))

    Alpine.data('dialogTitle', () => ({
        init() {
            this.$el
                .closest('dialog')
                ?.setAttribute('aria-labelledby', this.__makeTitleId())

            Alpine.bind(this.$el, {
                ':id': '__makeTitleId()',
            })
        },
    }))

    Alpine.data('dialogDescription', () => ({
        init() {
            this.$el
                .closest('dialog')
                ?.setAttribute('aria-describedby', this.__makeDescriptionId())

            Alpine.bind(this.$el, {
                ':id': '__makeDescriptionId()',
            })
        },
    }))
}

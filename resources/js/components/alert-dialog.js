export const registerComponent = () => {
    const ALERT_DIALOG_COMPONENT_ID = 'alert-dialog'

    const stateProps = {
        ':data-state'() {
            return this.__open ? 'open' : 'closed'
        },
    }

    Alpine.data('alertDialog', ({ defaultOpen }) => ({
        __main: undefined,
        __open: defaultOpen,
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
            return this.$id(ALERT_DIALOG_COMPONENT_ID + '-title')
        },

        __makeDescriptionId() {
            return this.$id(ALERT_DIALOG_COMPONENT_ID + '-description')
        },

        init() {
            this.__main = this.$el

            Alpine.bind(this.$el, {
                ...stateProps,
                'x-id'() {
                    return [ALERT_DIALOG_COMPONENT_ID]
                },
                'x-modelable': '__open',
            })

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
        },
    }))

    Alpine.data('alertDialogContent', () => ({
        init() {
            this.__main._x_lumen_dialog = this.$el

            Alpine.bind(this.$el, {
                ...stateProps,
                ':id'() {
                    return this.$id(ALERT_DIALOG_COMPONENT_ID + '-dialog')
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

    Alpine.data('alertDialogTrigger', () => ({
        init() {
            this.__main._x_lumen_trigger = this.$el
            Alpine.bind(this.$el, {
                ...stateProps,
                ':id'() {
                    return this.$id(ALERT_DIALOG_COMPONENT_ID + '-trigger')
                },
                '@click': '__onOpenChange(true)',
                'x-data': '',
            })
        },
    }))

    Alpine.data('alertDialogCancel', () => ({
        init() {
            Alpine.bind(this.$el, {
                ':id'() {
                    return this.$id(ALERT_DIALOG_COMPONENT_ID + '-cancel')
                },
                '@click': '__onOpenChange(false)',
                'x-data': '',
            })
        },
    }))

    Alpine.data('alertDialogTitle', () => ({
        init() {
            this.$el
                .closest('dialog')
                ?.setAttribute('aria-labelledby', this.__makeTitleId())
            Alpine.bind(this.$el, {
                ':id': '__makeTitleId()',
            })
        },
    }))

    Alpine.data('alertDialogDescription', () => ({
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

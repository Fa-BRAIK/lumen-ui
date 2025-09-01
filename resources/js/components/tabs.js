export const registerComponent = () => {
    const TAB_COMPONENT_ID = 'tabs'

    const commonProps = {
        ':dir'() {
            return this.dir
        },
        ':data-orientation'() {
            return this.orientation
        },
        ':aria-orientation'() {
            return this.orientation
        },
    }

    Alpine.data(
        'tabs',
        ({ defaultValue, orientation, dir, activationMode }) => ({
            __value: defaultValue,
            defaultValue,
            orientation,
            dir,
            activationMode,

            get isAutomaticActivation() {
                return this.activationMode === 'automatic'
            },

            __onValueChange(newValue) {
                this.__value = newValue
            },

            __makeTriggerId(baseId, value) {
                return `${baseId}-trigger-${value}`
            },

            __makeContentId(baseId, value) {
                return `${baseId}-content-${value}`
            },

            init() {
                if (!this.__value) {
                    this.__value = this.defaultValue
                }
                Alpine.bind(this.$el, {
                    ...commonProps,
                    'x-id'() {
                        return [TAB_COMPONENT_ID]
                    },
                    'x-modelable': '__value',
                })
            },
        }),
    )

    Alpine.data('tabsList', ({ loop }) => ({
        loop,

        init() {
            Alpine.bind(this.$el, {
                ...commonProps,
                '@keydown.right'() {
                    if (this.orientation !== 'horizontal') {
                        return
                    }

                    if (this.$focus.getNext()) {
                        this.$focus.next()
                    } else if (this.loop) {
                        this.$focus.first()
                    }
                },
                '@keydown.left'() {
                    if (this.orientation !== 'horizontal') {
                        return
                    }

                    if (this.$focus.getPrevious()) {
                        this.$focus.previous()
                    } else if (this.loop) {
                        this.$focus.last()
                    }
                },
                '@keydown.down'(event) {
                    if (this.orientation !== 'vertical') {
                        return
                    }

                    event.preventDefault()

                    if (this.$focus.getNext()) {
                        this.$focus.next()
                    } else if (this.loop) {
                        this.$focus.first()
                    }
                },
                '@keydown.up'(event) {
                    if (this.orientation !== 'vertical') {
                        return
                    }

                    event.preventDefault()

                    if (this.$focus.getPrevious()) {
                        this.$focus.previous()
                    } else if (this.loop) {
                        this.$focus.last()
                    }
                },
            })
        },
    }))

    Alpine.data('tabsTrigger', ({ value }) => ({
        value,
        disabled: false,

        get isSelected() {
            return this.__value === this.value
        },

        init() {
            this.disabled = this.$el.hasAttribute('disabled')
            Alpine.bind(this.$el, {
                ':aria-selected'() {
                    return this.isSelected ? 'true' : 'false'
                },
                ':aria-controls'() {
                    return this.__makeContentId(
                        this.$id(TAB_COMPONENT_ID),
                        this.value,
                    )
                },
                ':data-state'() {
                    return this.isSelected ? 'active' : 'inactive'
                },
                ':data-value'() {
                    return this.value
                },
                ':data-disabled'() {
                    return this.disabled ? 'true' : 'false'
                },
                ':id'() {
                    return this.__makeTriggerId(
                        this.$id(TAB_COMPONENT_ID),
                        this.value,
                    )
                },
                '@mousedown'(event) {
                    if (
                        !this.disabled &&
                        event.button === 0 &&
                        event.ctrlKey === false
                    ) {
                        this.__onValueChange(this.value)
                    } else {
                        event.preventDefault()
                    }
                },
                '@keydown.enter'() {
                    this.__onValueChange(this.value)
                },
                '@keydown.space'() {
                    this.__onValueChange(this.value)
                },
                '@focus'() {
                    if (
                        !this.isSelected &&
                        !this.disabled &&
                        this.isAutomaticActivation
                    ) {
                        this.__onValueChange(this.value)
                    }
                },
            })
        },
    }))

    Alpine.data('tabsContent', ({ value }) => ({
        value,

        get isSelected() {
            return this.__value === this.value
        },

        init() {
            Alpine.bind(this.$el, {
                ...commonProps,
                ':data-state'() {
                    return this.isSelected ? 'active' : 'inactive'
                },
                ':data-value'() {
                    return this.value
                },
                ':id'() {
                    return this.__makeContentId(
                        this.$id(TAB_COMPONENT_ID),
                        this.value,
                    )
                },
                ':aria-labelledby'() {
                    return this.__makeTriggerId(
                        this.$id(TAB_COMPONENT_ID),
                        this.value,
                    )
                },
                ':hidden'() {
                    return !this.isSelected
                },
            })
        },
    }))
}

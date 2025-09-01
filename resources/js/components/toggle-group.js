export const registerComponent = () => {
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
        'toggleGroup',
        ({
            defaultValue,
            rovingFocus,
            orientation,
            dir,
            loop,
            type,
            disabled,
        }) => ({
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
                    return
                }

                if (this.type === 'single') {
                    this.__value = [newValue]
                } else {
                    this.__value = this.__value.includes(newValue)
                        ? this.__value.filter((item) => item !== newValue)
                        : [...new Set([...this.__value, newValue])]
                }
            },

            init() {
                Alpine.bind(this.$el, {
                    ...commonProps,
                    '@keydown.right'() {
                        if (
                            this.__disabled ||
                            !this.rovingFocus ||
                            this.orientation !== 'horizontal'
                        ) {
                            return
                        }

                        if (this.$focus.getNext()) {
                            this.$focus.next()
                        } else if (this.loop) {
                            this.$focus.first()
                        }
                    },
                    '@keydown.left'() {
                        if (
                            this.__disabled ||
                            !this.rovingFocus ||
                            this.orientation !== 'horizontal'
                        ) {
                            return
                        }

                        if (this.$focus.getPrevious()) {
                            this.$focus.previous()
                        } else if (this.loop) {
                            this.$focus.last()
                        }
                    },
                    'x-modelable': '__value',
                })
            },
        }),
    )

    Alpine.data(
        'toggleGroupItem',
        ({ value, disabled, orientation, type, dir }) => ({
            value,
            disabled,
            type,
            orientation,
            dir,

            get selected() {
                return this.__value.includes(this.value)
            },

            init() {
                Alpine.bind(this.$el, {
                    ...commonProps,
                    ':data-state'() {
                        return this.selected ? 'on' : 'off'
                    },
                    ':aria-checked'() {
                        return this.selected ? 'true' : 'false'
                    },
                    ':data-disabled'() {
                        return this.disabled ? true : undefined
                    },
                    ':disabled'() {
                        return this.disabled ? 'disabled' : undefined
                    },
                    '@click'() {
                        if (!this.disabled) {
                            this.__onValueChange(this.value)
                        }
                    },
                    '@keydown.enter.prevent'() {
                        if (!this.disabled) {
                            this.__onValueChange(this.value)
                        }
                    },
                })
            },
        }),
    )
}

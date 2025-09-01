export const registerComponent = () => {
    const SELECT_COMPONENT_ID = 'select'

    Alpine.data('select', ({ defaultValue, defaultOpen, dir, disabled }) => ({
        __main: undefined,
        __value: defaultValue,
        __open: defaultOpen,
        defaultValue,
        defaultOpen,
        dir,
        disabled,

        get __trigger() {
            return this.__main._x_lumen_trigger
        },

        get __content() {
            return this.__main._x_lumen_content
        },

        get __viewport() {
            return this.__main._x_lumen_viewport
        },

        __onValueChange(value) {
            if (this.disabled) {
                return
            }

            this.__value = value
        },

        __onOpenChange(open) {
            if (this.disabled) {
                return
            }

            this.__open = open

            this.$nextTick(() => {
                this.$focus.focus(this.__trigger)
            })
        },

        __makeTriggerId(baseId) {
            return `${baseId}-trigger`
        },

        __makeContentId(baseId) {
            return `${baseId}-content`
        },

        __makeItemId(baseId, value) {
            return `${baseId}-item-${value}`
        },

        init() {
            this.__main = this.$el

            this.$watch('__open', (newValue) => {
                if (newValue) {
                    document.body.setAttribute('data-scroll-locked', '1')
                    document.body.style.pointerEvents = 'none'

                    const options =
                        this.__content.querySelectorAll('[role="option"]')
                    const enabledOptions = Array.from(options).filter(
                        (option) => !option.hasAttribute('data-disabled'),
                    )
                    const selectedItem = Array.from(enabledOptions).find(
                        (option) =>
                            option.getAttribute('data-state') === 'selected',
                    )

                    this.$nextTick(() => {
                        this.$nextTick(() => {
                            if (selectedItem) {
                                this.$focus.focus(selectedItem)
                            } else if (enabledOptions.length > 0) {
                                this.$focus.focus(enabledOptions[0])
                            }
                        })
                    })
                } else {
                    document.body.removeAttribute('data-scroll-locked')
                    document.body.style.pointerEvents = ''
                }
            })
            Alpine.bind(this.$el, {
                'x-id'() {
                    return [SELECT_COMPONENT_ID]
                },
                '@click.outside'() {
                    if (this.__open && !this.disabled) {
                        this.__onOpenChange(false)
                    }
                },
                'x-modelable': '__value',
            })
        },
    }))

    Alpine.data('selectTrigger', () => ({
        init() {
            this.__main._x_lumen_trigger = this.$el
            Alpine.bind(this.$el, {
                ':id'() {
                    return this.__makeTriggerId(this.$id(SELECT_COMPONENT_ID))
                },
                ':aria-controls'() {
                    return this.__open
                        ? this.__makeContentId(this.$id(SELECT_COMPONENT_ID))
                        : undefined
                },
                ':data-placeholder'() {
                    return this.__value ? undefined : ''
                },
                '@click'() {
                    this.__onOpenChange(!this.__open)
                },
                '@keydown.space'() {
                    this.__onOpenChange(!this.__open)
                },
            })
        },
    }))

    Alpine.data('selectValue', ({ placeholder }) => ({
        placeholder,
        label: '',

        __updateLabel() {
            this.label = this.__value
                ? (this.__content
                      ?.querySelector(`[data-value="${this.__value}"]`)
                      ?.querySelector('[data-slot=select-item-text]')
                      ?.textContent ?? this.__value)
                : this.placeholder
        },

        init() {
            this.$watch('__value', (newValue) => {
                this.$nextTick(() => this.__updateLabel())
            })
            this.$nextTick(() => this.__updateLabel())
            Alpine.bind(this.$el, {
                'x-text': 'label || placeholder',
                'x-slot': 'select-value',
            })
        },
    }))

    Alpine.data('selectContent', ({ side, align, sideOffset }) => ({
        side,
        align,
        sideOffset,
        __scrollTop: 0,
        __clientHeight: 0,
        __scrollHeight: 0,

        init() {
            this.__main._x_lumen_content = this.$el

            this.$nextTick(() => {
                this.$el.style.setProperty(
                    '--lumen-trigger-width',
                    `${this.__trigger.offsetWidth}px`,
                )
            })

            this.$watch('__open', (newValue) => {
                this.$nextTick(() => {
                    if (newValue) this.$focus.focus(this.$el)

                    this.__scrollTop = this.__viewport.scrollTop
                    this.__clientHeight = this.__viewport.clientHeight
                    this.__scrollHeight = this.__viewport.scrollHeight
                })
            })

            const el = this.$el
            Alpine.bind(this.$el, {
                'x-show'() {
                    return this.__open
                },
                ':data-state'() {
                    return this.__open ? 'open' : 'closed'
                },
                ':data-side'() {
                    return side
                },
                ':data-align'() {
                    return align
                },
                ':id'() {
                    return this.__makeContentId(this.$id(SELECT_COMPONENT_ID))
                },
                ':aria-labelledby'() {
                    return this.__makeTriggerId(this.$id(SELECT_COMPONENT_ID))
                },
                ':tabindex'() {
                    return this.disabled ? '-1' : '0'
                },
                'x-transition:enter': 'transition ease-in duration-100',
                'x-transition:enter-start': 'opacity-0 -translate-y-2',
                'x-transition:enter-end': 'opacity-100 translate-y-0',
                'x-transition:leave': 'transition ease duration-100',
                'x-transition:leave-start': 'opacity-100 translate-y-0',
                'x-transition:leave-end': 'opacity-0 -translate-y-2',
                'x-anchorplus'() {
                    return {
                        reference: this.__trigger,
                        placement:
                            this.side +
                            (this.align === 'center' ? '' : `-${this.align}`),
                        sideOffset: this.sideOffset,
                        calculateSize: {
                            varName: '--lumen-select-content-available-height',
                            additionalSpace: 10,
                        },
                    }
                },
                '@keydown.down'() {
                    if (this.__open) {
                        if (this.$focus.getNext()) this.$focus.next()
                        else if (this.$focus.focused() === el) {
                            this.$focus.first()
                        }
                    }
                },
                '@keydown.up'() {
                    if (this.__open) {
                        if (this.$focus.getPrevious()) this.$focus.previous()
                        else if (this.$focus.focused() === el) {
                            this.$focus.last()
                        }
                    }
                },
                '@keydown.escape'() {
                    if (this.__open) {
                        this.__onOpenChange(false)
                        this.$focus.focus(this.__trigger)
                    }
                },
            })
        },
    }))

    Alpine.data('selectViewport', () => ({
        init() {
            this.__main._x_lumen_viewport = this.$el
        },
    }))

    Alpine.data('selectItem', ({ value, disabled }) => ({
        value,
        disabled,
        isFocused: false,

        get selected() {
            return this.__value === this.value
        },

        __onClick() {
            if (this.disabled) return

            this.__onValueChange(this.value)
            this.__onOpenChange(false)
        },

        init() {
            Alpine.bind(this.$el, {
                ':data-state'() {
                    return this.selected ? 'selected' : 'unselected'
                },
                ':aria-selected'() {
                    return this.selected ? 'true' : 'false'
                },
                ':data-value'() {
                    return this.value
                },
                ':aria-labelledby'() {
                    return this.__makeItemId(
                        this.$id(SELECT_COMPONENT_ID),
                        this.value,
                    )
                },
                ':data-highlighted'() {
                    return this.isFocused ? '' : undefined
                },
                ':data-disabled'() {
                    return this.disabled ? 'true' : undefined
                },
                ':aria-disabled'() {
                    return this.disabled ? 'true' : undefined
                },
                ':disabled'() {
                    return this.disabled ? 'disabled' : undefined
                },
                ':tabindex'() {
                    return this.disabled ? '-1' : '0'
                },
                '@mouseenter'() {
                    this.$focus.focus(el)
                    this.isFocused = true
                },
                '@mouseleave'() {
                    if (this.$focus.focused() === el) {
                        el.blur()
                        this.isFocused = false
                    }
                },
                '@keydown.enter'() {
                    if (this.disabled) return

                    this.__onValueChange(this.value)
                    this.__onOpenChange(false)
                },
                '@keydown.space.prevent'() {
                    if (this.disabled) return

                    this.__onValueChange(this.value)
                    this.__onOpenChange(false)
                },
                '@click': '__onClick',
            })
        },
    }))

    Alpine.data('selectItemText', () => ({
        init() {
            Alpine.bind(this.$el, {
                ':id'() {
                    return this.__makeItemId(
                        this.$id(SELECT_COMPONENT_ID),
                        this.value,
                    )
                },
            })
        },
    }))

    Alpine.data('selectItemIndicator', () => ({
        init() {
            Alpine.bind(this.$el, {
                'x-show'() {
                    return this.selected
                },
            })
        },
    }))

    Alpine.data('selectScrollDownButton', () => ({
        hovered: false,
        scrollInterval: undefined,

        init() {
            this.$watch('hovered', (newValue) => {
                this.$nextTick(() => {
                    if (newValue) {
                        this.scrollInterval = setInterval(() => {
                            this.__viewport.scrollTop += 4
                            this.__scrollTop = this.__viewport.scrollTop
                        }, 10)
                    } else {
                        clearInterval(this.scrollInterval)
                    }
                })
            })

            Alpine.bind(this.$el, {
                'x-show'() {
                    return (
                        this.__scrollTop + this.__clientHeight <
                        this.__scrollHeight
                    )
                },
                '@mouseenter'() {
                    this.hovered = true
                },
                '@mouseleave'() {
                    this.hovered = false
                },
            })
        },
    }))

    Alpine.data('selectScrollUpButton', () => ({
        hovered: false,
        scrollInterval: undefined,

        init() {
            this.$watch('hovered', (newValue) => {
                this.$nextTick(() => {
                    if (newValue) {
                        this.scrollInterval = setInterval(() => {
                            this.__viewport.scrollTop -= 4
                            this.__scrollTop = this.__viewport.scrollTop
                        }, 10)
                    } else {
                        clearInterval(this.scrollInterval)
                    }
                })
            })
            Alpine.bind(this.$el, {
                'x-show'() {
                    return this.__scrollTop !== 0
                },
                '@mouseenter'() {
                    this.hovered = true
                },
                '@mouseleave'() {
                    this.hovered = false
                },
            })
        },
    }))
}

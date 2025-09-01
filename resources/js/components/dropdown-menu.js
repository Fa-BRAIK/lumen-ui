export const registerComponent = () => {
    const DROPDOWN_MENU_COMPONENT_ID = 'dropdown-menu'
    const DROPDOWN_MENU_SUB_COMPONENT_ID = 'dropdown-menu-sub'

    Alpine.data('dropdownMenu', ({ defaultOpen, dir, modal }) => ({
        __main: undefined,
        __open: defaultOpen,
        defaultOpen,
        dir,
        modal,

        get __trigger() {
            return this.__main._x_lumen_trigger
        },

        __onOpenChange(newValue) {
            this.$nextTick(() => {
                this.__open = newValue
            })
        },

        __makeTriggerId(baseId) {
            return `${baseId}-trigger`
        },

        __makeContentId(baseId) {
            return `${baseId}-content`
        },

        init() {
            this.__main = this.$el

            this.$watch('__open', (newValue) => {
                if (this.modal) {
                    if (newValue) {
                        document.body.setAttribute('data-scroll-locked', '1')
                        document.body.style.pointerEvents = 'none'
                    } else {
                        document.body.removeAttribute('data-scroll-locked')
                        document.body.style.pointerEvents = ''
                    }
                }
            })

            Alpine.bind(this.$el, {
                'x-id'() {
                    return [DROPDOWN_MENU_COMPONENT_ID]
                },
                '@keydown.escape'() {
                    if (this.__open) {
                        this.__onOpenChange(false)
                    }
                },
                '@click.window'() {
                    if (this.__open) {
                        this.__onOpenChange(false)
                    }
                },
                'x-modelable': '__open',
            })
        },
    }))

    Alpine.data('dropdownMenuTrigger', () => ({
        init() {
            this.__main._x_lumen_trigger = this.$el

            Alpine.bind(this.$el, {
                ':id'() {
                    return this.__makeTriggerId(
                        this.$id(DROPDOWN_MENU_COMPONENT_ID),
                    )
                },
                ':aria-expanded'() {
                    return this.__open ? 'true' : 'false'
                },
                ':aria-controls'() {
                    return this.__open
                        ? this.__makeContentId(
                              this.$id(DROPDOWN_MENU_COMPONENT_ID),
                          )
                        : undefined
                },
                '@click'() {
                    this.__onOpenChange(!this.__open)
                },
            })
        },
    }))

    Alpine.data('dropdownMenuContent', ({ side, align, sideOffset }) => ({
        side,
        align,
        sideOffset,

        init() {
            this.__main._x_lumen_content = this.$el

            this.$watch('__open', (newValue) => {
                if (newValue) {
                    this.$nextTick(() => {
                        this.$focus.focus(this.$el)
                    })
                }
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
                    return this.__makeContentId(
                        this.$id(DROPDOWN_MENU_COMPONENT_ID),
                    )
                },
                ':aria-labelledby'() {
                    return this.__makeTriggerId(
                        this.$id(DROPDOWN_MENU_COMPONENT_ID),
                    )
                },
                'x-transition:enter': 'transition ease-in duration-150',
                'x-transition:enter-start': 'opacity-0 scale-95 translate-y-2',
                'x-transition:enter-end': 'opacity-100 scale-100 translate-y-0',
                'x-transition:leave': 'transition ease duration-150',
                'x-transition:leave-start':
                    'opacity-100 scale-100 translate-y-0',
                'x-transition:leave-end': 'opacity-0 scale-95 translate-y-2',
                'x-anchorplus'() {
                    return {
                        reference: this.__trigger,
                        placement:
                            this.side +
                            (this.align === 'center' ? '' : `-${this.align}`),
                        sideOffset: this.sideOffset,
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

    const menuItemCommonProps = (el) => ({
        '@mouseenter'() {
            this.$focus.focus(el)
            this.isFocused = true

            this.$el
                .closest(
                    `#${this.__makeContentId(this.$id(DROPDOWN_MENU_COMPONENT_ID))}`,
                )
                ?.querySelectorAll('[data-state="open"]')
                .forEach((el) => el.__closeDropdownSubMenu())
        },
        '@mouseleave'() {
            if (this.$focus.focused() === el) {
                el.blur()
                this.isFocused = false
            }
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
            return this.disabled ? undefined : '-1'
        },
    })

    Alpine.data('dropdownMenuItem', ({ disabled }) => ({
        isFocused: false,
        disabled,

        init() {
            const el = this.$el
            Alpine.bind(this.$el, {
                ...menuItemCommonProps(el),
            })
        },
    }))

    Alpine.data('dropdownMenuCheckboxItem', ({ disabled }) => ({
        __checked: false,
        isFocused: false,
        disabled,

        init() {
            const el = this.$el
            Alpine.bind(this.$el, {
                ...menuItemCommonProps(el),
                ':aria-checked'() {
                    return this.__checked ? 'true' : 'false'
                },
                ':data-state'() {
                    return this.__checked ? 'checked' : 'unchecked'
                },
                ':checked'() {
                    return this.__checked ? 'true' : 'false'
                },
                '@click'() {
                    if (!this.disabled) {
                        this.__checked = !this.__checked
                        this.__onOpenChange(false)
                    }
                },
                '@keydown.enter'() {
                    if (!this.disabled) {
                        this.__checked = !this.__checked
                        this.__onOpenChange(false)
                    }
                },
                '@keydown.space'() {
                    if (!this.disabled) {
                        this.__checked = !this.__checked
                        this.__onOpenChange(false)
                    }
                },
                'x-modelable': '__checked',
            })
        },
    }))

    Alpine.data('dropdownMenuCheckboxItemIndicator', () => ({
        init() {
            Alpine.bind(this.$el, {
                'x-show'() {
                    return this.__checked
                },
                ':data-state'() {
                    return this.__checked ? 'checked' : 'unchecked'
                },
            })
        },
    }))

    Alpine.data('dropdownMenuRadioGroup', ({ defaultValue, disabled }) => ({
        __value: defaultValue,
        defaultValue,
        disabled,

        __onValueChange(newValue) {
            if (this.disabled) return

            this.__value = newValue
        },

        init() {
            Alpine.bind(this.$el, {
                'x-modelable': '__value',
            })
        },
    }))

    Alpine.data('dropdownMenuRadioItem', ({ value, disabled }) => ({
        value,
        disabled,
        isFocused: false,

        get __checked() {
            return this.__value === this.value
        },

        init() {
            const el = this.$el
            Alpine.bind(this.$el, {
                ...menuItemCommonProps(el),
                ':aria-checked'() {
                    return this.__value === this.value ? 'true' : 'false'
                },
                ':data-state'() {
                    return this.__value === this.value ? 'checked' : 'unchecked'
                },
                ':data-value'() {
                    return this.value
                },
                '@click'() {
                    if (!this.disabled) {
                        this.__onValueChange(this.value)
                    }
                },
                '@keydown.enter'() {
                    if (!this.disabled) {
                        this.__onValueChange(this.value)
                        this.__onOpenChange(false)
                    }
                },
                '@keydown.space'() {
                    if (!this.disabled) {
                        this.__onValueChange(this.value)
                        this.__onOpenChange(false)
                    }
                },
            })
        },
    }))

    Alpine.data('dropdownMenuRadioGroupItemIndicator', () => ({
        init() {
            Alpine.bind(this.$el, {
                'x-show'() {
                    return this.__checked
                },
                ':data-state'() {
                    return this.__checked ? 'checked' : 'unchecked'
                },
            })
        },
    }))

    Alpine.data('dropdownMenuSubMenu', () => ({
        __subMain: undefined,
        __subOpen: false,

        get __trigger() {
            return this.__subMain._x_lumen_trigger
        },

        get __content() {
            return this.__subMain._x_lumen_content
        },

        __onSubOpenChange(newValue) {
            this.__subOpen = newValue
        },

        init() {
            this.__subMain = this.$el

            this.$watch('__open', (newValue) => {
                if (!newValue) {
                    this.$nextTick(() => {
                        this.__subOpen = false
                    })
                }
            })

            Alpine.bind(this.$el, {
                'x-modelable': '__subOpen',
                'x-id'() {
                    return [DROPDOWN_MENU_SUB_COMPONENT_ID]
                },
            })
        },
    }))

    Alpine.data('dropdownMenuSubMenuTrigger', () => ({
        isFocused: false,

        init() {
            this.__subMain._x_lumen_trigger = this.$el

            this.$el.__closeDropdownSubMenu = () => {
                this.__onSubOpenChange(false)
            }

            const el = this.$el
            Alpine.bind(this.$el, {
                ...menuItemCommonProps(el),
                '@mouseenter'() {
                    this.__onSubOpenChange(true)
                    this.isFocused = true
                },
                '@mouseleave'(event) {
                    this.isFocused = false
                },
                '@keydown.right'() {
                    if (!this.__subOpen) {
                        this.__onSubOpenChange(true)

                        const firstItem =
                            this.__content.querySelector('[role="menuitem"]')

                        if (firstItem) {
                            this.$nextTick(() => {
                                this.$nextTick(() => {
                                    this.$focus.focus(firstItem)
                                })
                            })
                        }
                    }
                },
                ':tabindex'() {
                    return this.disabled ? undefined : '0'
                },
                ':id'() {
                    return this.__makeTriggerId(
                        this.$id(DROPDOWN_MENU_SUB_COMPONENT_ID),
                    )
                },
                ':aria-expanded'() {
                    return this.__subOpen ? 'true' : 'false'
                },
                ':data-state'() {
                    return this.__subOpen ? 'open' : 'closed'
                },
                ':aria-controls'() {
                    return this.__subOpen
                        ? this.__makeContentId(
                              this.$id(DROPDOWN_MENU_SUB_COMPONENT_ID),
                          )
                        : undefined
                },
            })
        },
    }))

    Alpine.data(
        'dropdownMenuSubMenuContent',
        ({ side, align, sideOffset }) => ({
            side,
            align,
            sideOffset,

            init() {
                this.__subMain._x_lumen_content = this.$el

                this.$watch('__subOpen', (newValue) => {
                    if (newValue) {
                        this.$nextTick(() => {
                            this.$focus.focus(this.$el)
                        })
                    }
                })

                const el = this.$el
                Alpine.bind(this.$el, {
                    'x-show'() {
                        return this.__subOpen
                    },
                    ':data-state'() {
                        return this.__subOpen ? 'open' : 'closed'
                    },
                    ':data-side'() {
                        return side
                    },
                    ':data-align'() {
                        return align
                    },
                    ':id'() {
                        return this.__makeContentId(
                            this.$id(DROPDOWN_MENU_SUB_COMPONENT_ID),
                        )
                    },
                    ':aria-labelledby'() {
                        return this.__makeTriggerId(
                            this.$id(DROPDOWN_MENU_SUB_COMPONENT_ID),
                        )
                    },
                    'x-transition:enter': 'transition ease-in duration-150',
                    'x-transition:enter-start':
                        'opacity-0 scale-95 translate-y-2',
                    'x-transition:enter-end':
                        'opacity-100 scale-100 translate-y-0',
                    'x-transition:leave': 'transition ease duration-150',
                    'x-transition:leave-start':
                        'opacity-100 scale-100 translate-y-0',
                    'x-transition:leave-end':
                        'opacity-0 scale-95 translate-y-2',
                    'x-anchorplus'() {
                        return {
                            reference: this.__trigger,
                            placement:
                                this.side +
                                (this.align === 'center'
                                    ? ''
                                    : `-${this.align}`),
                            sideOffset: this.sideOffset,
                        }
                    },
                    '@keydown.down'() {
                        if (this.__subOpen) {
                            if (this.$focus.getNext()) this.$focus.next()
                            else if (this.$focus.focused() === el) {
                                this.$focus.first()
                            }
                        }
                    },
                    '@keydown.up'() {
                        if (this.__subOpen) {
                            if (this.$focus.getPrevious())
                                this.$focus.previous()
                            else if (this.$focus.focused() === el) {
                                this.$focus.last()
                            }
                        }
                    },
                    '@keydown.escape'() {
                        if (this.__subOpen) {
                            this.__onSubOpenChange(false)
                            this.$focus.focus(this.__trigger)
                        }
                    },
                    '@keydown.left'() {
                        if (this.__subOpen) {
                            this.__onSubOpenChange(false)
                            this.$focus.focus(this.__trigger)
                        }
                    },
                })
            },
        }),
    )
}

export const registerComponent = () => {
    Alpine.data('toggle', ({ defaultPressed, disabled }) => ({
        __value: defaultPressed,
        defaultPressed,
        disabled,

        get pressed() {
            return this.__value
        },

        __onValueChange(value) {
            this.__value = value
        },

        init() {
            Alpine.bind(this.$el, {
                ':aria-pressed'() {
                    return this.__value ? 'true' : 'false'
                },
                ':disabled'() {
                    return this.disabled ? 'disabled' : undefined
                },
                ':data-disabled'() {
                    return this.disabled ? 'disabled' : undefined
                },
                ':data-state'() {
                    return this.__value ? 'on' : 'off'
                },
                '@click'() {
                    if (!this.disabled) {
                        this.__onValueChange(!this.__value)
                    }
                },
                '@keydown.enter.prevent'() {
                    if (!this.disabled) {
                        this.__onValueChange(!this.__value)
                    }
                },
                'x-modelable': '__value',
            })
        },
    }))
}

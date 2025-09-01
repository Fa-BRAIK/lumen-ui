export const registerComponent = () => {
    Alpine.data('switchInput', ({ defaultChecked, disabled }) => ({
        __value: defaultChecked,
        defaultChecked,
        disabled,

        get checked() {
            return this.__value
        },

        __onValueChange(newValue) {
            this.__value = newValue
        },

        init() {
            Alpine.bind(this.$el, {
                ':aria-checked'() {
                    return this.__value ? 'true' : 'false'
                },
                ':disabled'() {
                    return this.disabled ? 'disabled' : undefined
                },
                ':data-state'() {
                    return this.__value ? 'checked' : 'unchecked'
                },
                '@click'() {
                    if (!this.disabled) {
                        this.__onValueChange(!this.__value)
                    }
                },
                '@keydown.enter'() {
                    if (!this.disabled) {
                        this.__onValueChange(!this.__value)
                    }
                },
                'x-modelable': '__value',
            })
        },
    }))
}

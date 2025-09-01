export const registerComponent = () => {
    Alpine.data('checkbox', ({ defaultChecked, disabled }) => ({
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
                ':data-state'() {
                    return this.__value ? 'checked' : 'unchecked'
                },
                '@click'() {
                    if (!this.disabled) {
                        this.__onValueChange(!this.__value)
                    }
                },
                'x-data'() {
                    return {}
                },
                'x-modelable': '__value',
            })
        },
    }))
}

export const registerComponent = () => {
    const commonProps = {
        ':data-state'() {
            return this.state
        },
        ':data-value'() {
            return this.__value
        },
        ':data-max'() {
            return this.max
        },
    }

    Alpine.data('progress', ({ value, max }) => ({
        initialValue: value,
        __value: value,
        max,

        get state() {
            return this._value >= this.max ? 'complete' : 'loading'
        },

        init() {
            Alpine.bind(this.$el, {
                ...commonProps,
                ':aria-valuemin'() {
                    return this.initialValue
                },
                ':aria-valuemax'() {
                    return this.max
                },
                'x-modelable': '__value',
            })
        },
    }))

    Alpine.data('progressIndicator', () => ({
        init() {
            Alpine.bind(this.$el, {
                ...commonProps,
                ':style'() {
                    return {
                        transform: `translateX(-${100 - (this.__value ?? 0)}%)`,
                    }
                },
            })
        },
    }))
}

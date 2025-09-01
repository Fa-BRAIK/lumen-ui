export const registerComponent = () => {
    const resolveLoadingStatus = (image, src = null) => {
        if (!image) return 'idle'
        else if (!src) return 'error'
        else if (image.src !== src) {
            image.src = src
        }

        return image.complete && image.naturalWidth > 0 ? 'loaded' : 'loading'
    }

    Alpine.data('avatar', () => ({
        __main: undefined,
        __status: 'idle', // 'idle', 'loading', 'loaded', 'error'

        __onStatusChange(image, src) {
            this.__status = resolveLoadingStatus(image, src)
        },

        init() {
            this.__main = this.$el
        },
    }))

    Alpine.data('avatarImage', ({ src }) => ({
        src,

        init() {
            this.$el.onload = () => this.__onStatusChange(this.$el, this.src)
            this.$el.onerror = () => this.__onStatusChange(this.$el, null)
            this.$el.src = this.src
            Alpine.bind(this.$el, {
                'x-show'() {
                    return (
                        this.__status === 'loading' ||
                        this.__status === 'loaded'
                    )
                },
            })
        },
    }))

    Alpine.data('avatarFallback', () => ({
        init() {
            this.__main._x_lumen_fallback = this.$el
            Alpine.bind(this.$el, {
                'x-show'() {
                    return this.__status === 'error' || this.__status === 'idle'
                },
            })
        },
    }))
}

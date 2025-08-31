export const registerComponent = () => {
    Alpine.data(
        'carousel',
        ({ orientation, direction, loop, pluginNames, pluginsObjectName }) => {
            const plugins = pluginNames
                .map((name) => window[pluginsObjectName]?.[name])
                .filter(Boolean)

            return {
                __main: undefined,
                __emblaApi: null,
                __canScrollNext: false,
                __canScrollPrev: false,
                orientation,
                loop,
                direction,
                plugins,

                get __content() {
                    return this.__main._x_lumen_content
                },

                get __emblaOptions() {
                    return {
                        loop: this.loop,
                        direction: this.direction,
                        axis: this.orientation === 'horizontal' ? 'x' : 'y',
                        container: this.__content.firstChild,
                    }
                },

                __updateCanScroll() {
                    this.__canScrollNext =
                        this.__emblaApi?.canScrollNext() ?? false
                    this.__canScrollPrev =
                        this.__emblaApi?.canScrollPrev() ?? false
                },

                init() {
                    this.__main = this.$el

                    this.$nextTick(() => {
                        this.__emblaApi = this.$emblaApi(
                            this.$el,
                            this.__emblaOptions,
                            this.plugins,
                        )
                        this.__emblaApi.on('select', () =>
                            this.__updateCanScroll(),
                        )
                        this.__emblaApi.on('init', () =>
                            this.__updateCanScroll(),
                        )
                    })

                    Alpine.bind(this.$el, {
                        'x-effect'() {
                            this.__emblaApi?.reInit(
                                this.__emblaOptions,
                                this.plugins,
                            )
                        },
                    })
                },

                destroy() {
                    this.__emblaApi?.destroy()
                },
            }
        },
    )

    Alpine.data('carouselContent', () => ({
        init() {
            this.__main._x_lumen_content = this.$el
        },
    }))

    Alpine.data('carouselNext', () => ({
        init() {
            Alpine.bind(this.$el, {
                '@click': '__emblaApi?.scrollNext()',
                ':disabled': '! __canScrollNext',
            })
        },
    }))

    Alpine.data('carouselPrevious', () => ({
        init() {
            Alpine.bind(this.$el, {
                '@click': '__emblaApi?.scrollPrev()',
                ':disabled': '! __canScrollPrev',
            })
        },
    }))
}

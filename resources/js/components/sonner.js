/**
 * Original code taken from https://devdojo.com/pines/docs/toast
 */
export const registerComponent = () => {
    const handleRoot = (el, Alpine, {}) => {
        Alpine.bind(el, {
            'x-data'() {
                return {
                    toasts: [],
                    toastsHovered: false,
                    expanded: false,
                    layout: 'default',
                    position: 'top-center',
                    paddingBetweenToasts: 15,
                    deleteToastWithId(id) {
                        for (let i = 0; i < this.toasts.length; i++) {
                            if (this.toasts[i].id === id) {
                                this.toasts.splice(i, 1)
                                break
                            }
                        }
                    },
                    burnToast(id) {
                        const burnToast = this.getToastWithId(id)
                        const burnToastElement = document.getElementById(
                            burnToast.id,
                        )
                        if (burnToastElement) {
                            if (this.toasts.length === 1) {
                                if (this.layout === 'default') {
                                    this.expanded = false
                                }
                                burnToastElement.classList.remove(
                                    'translate-y-0',
                                )
                                if (this.position.includes('bottom')) {
                                    burnToastElement.classList.add(
                                        'translate-y-full',
                                    )
                                } else {
                                    burnToastElement.classList.add(
                                        '-translate-y-full',
                                    )
                                }
                                burnToastElement.classList.add(
                                    '-translate-y-full',
                                )
                            }
                            burnToastElement.classList.add('opacity-0')
                            const self = this
                            setTimeout(function () {
                                self.deleteToastWithId(id)
                                setTimeout(function () {
                                    self.stackToasts()
                                }, 1)
                            }, 300)
                        }
                    },
                    getToastWithId(id) {
                        for (let i = 0; i < this.toasts.length; i++) {
                            if (this.toasts[i].id === id) {
                                return this.toasts[i]
                            }
                        }
                    },
                    stackToasts() {
                        this.positionToasts()
                        this.calculateHeightOfToastsContainer()
                        const self = this
                        setTimeout(function () {
                            self.calculateHeightOfToastsContainer()
                        }, 300)
                    },
                    positionToasts() {
                        if (this.toasts.length === 0) return
                        let topToast = document.getElementById(
                            this.toasts[0].id,
                        )
                        topToast.style.zIndex = '100'
                        if (this.expanded) {
                            if (this.position.includes('bottom')) {
                                topToast.style.top = 'auto'
                                topToast.style.bottom = '0px'
                            } else {
                                topToast.style.top = '0px'
                            }
                        }

                        let bottomPositionOfFirstToast =
                            this.getBottomPositionOfElement(topToast)

                        if (this.toasts.length === 1) return
                        let middleToast = document.getElementById(
                            this.toasts[1].id,
                        )
                        middleToast.style.zIndex = '90'

                        if (this.expanded) {
                            const middleToastPosition =
                                topToast.getBoundingClientRect().height +
                                this.paddingBetweenToasts +
                                'px'

                            if (this.position.includes('bottom')) {
                                middleToast.style.top = 'auto'
                                middleToast.style.bottom = middleToastPosition
                            } else {
                                middleToast.style.top = middleToastPosition
                            }

                            middleToast.style.scale = '100%'
                            middleToast.style.transform = 'translateY(0px)'
                        } else {
                            middleToast.style.scale = '94%'
                            if (this.position.includes('bottom')) {
                                middleToast.style.transform =
                                    'translateY(-16px)'
                            } else {
                                this.alignBottom(topToast, middleToast)
                                middleToast.style.transform = 'translateY(16px)'
                            }
                        }

                        if (this.toasts.length === 2) return
                        let bottomToast = document.getElementById(
                            this.toasts[2].id,
                        )
                        bottomToast.style.zIndex = '80'
                        if (this.expanded) {
                            const bottomToastPosition =
                                topToast.getBoundingClientRect().height +
                                this.paddingBetweenToasts +
                                middleToast.getBoundingClientRect().height +
                                this.paddingBetweenToasts +
                                'px'

                            if (this.position.includes('bottom')) {
                                bottomToast.style.top = 'auto'
                                bottomToast.style.bottom = bottomToastPosition
                            } else {
                                bottomToast.style.top = bottomToastPosition
                            }

                            bottomToast.style.scale = '100%'
                            bottomToast.style.transform = 'translateY(0px)'
                        } else {
                            bottomToast.style.scale = '88%'
                            if (this.position.includes('bottom')) {
                                bottomToast.style.transform =
                                    'translateY(-32px)'
                            } else {
                                this.alignBottom(topToast, bottomToast)
                                bottomToast.style.transform = 'translateY(32px)'
                            }
                        }

                        if (this.toasts.length === 3) return
                        let burnToast = document.getElementById(
                            this.toasts[3].id,
                        )
                        burnToast.style.zIndex = '70'
                        if (this.expanded) {
                            const burnToastPosition =
                                topToast.getBoundingClientRect().height +
                                this.paddingBetweenToasts +
                                middleToast.getBoundingClientRect().height +
                                this.paddingBetweenToasts +
                                bottomToast.getBoundingClientRect().height +
                                this.paddingBetweenToasts +
                                'px'

                            if (this.position.includes('bottom')) {
                                burnToast.style.top = 'auto'
                                burnToast.style.bottom = burnToastPosition
                            } else {
                                burnToast.style.top = burnToastPosition
                            }

                            burnToast.style.scale = '100%'
                            burnToast.style.transform = 'translateY(0px)'
                        } else {
                            burnToast.style.scale = '82%'
                            this.alignBottom(topToast, burnToast)
                            burnToast.style.transform = 'translateY(48px)'
                        }

                        burnToast.firstElementChild.classList.remove(
                            'opacity-100',
                        )
                        burnToast.firstElementChild.classList.add('opacity-0')

                        const self = this
                        // Burn 🔥 (remove) last toast
                        setTimeout(function () {
                            self.toasts.pop()
                        }, 300)

                        if (this.position.includes('bottom')) {
                            middleToast.style.top = 'auto'
                        }
                    },
                    alignBottom(element1, element2) {
                        // Get the top position and height of the first element
                        const top1 = element1.offsetTop
                        const height1 = element1.offsetHeight

                        // Get the height of the second element
                        const height2 = element2.offsetHeight

                        // Calculate the top position for the second element
                        const top2 = top1 + (height1 - height2)

                        // Apply the calculated top position to the second element
                        element2.style.top = top2 + 'px'
                    },
                    alignTop(element1, element2) {
                        // Get the top position of the first element
                        const top1 = element1.offsetTop

                        // Apply the same top position to the second element
                        element2.style.top = top1 + 'px'
                    },
                    resetBottom() {
                        for (let i = 0; i < this.toasts.length; i++) {
                            if (document.getElementById(this.toasts[i].id)) {
                                let toastElement = document.getElementById(
                                    this.toasts[i].id,
                                )
                                toastElement.style.bottom = '0px'
                            }
                        }
                    },
                    resetTop() {
                        for (let i = 0; i < this.toasts.length; i++) {
                            if (document.getElementById(this.toasts[i].id)) {
                                let toastElement = document.getElementById(
                                    this.toasts[i].id,
                                )
                                toastElement.style.top = '0px'
                            }
                        }
                    },
                    getBottomPositionOfElement(el) {
                        return (
                            el.getBoundingClientRect().height +
                            el.getBoundingClientRect().top
                        )
                    },
                    calculateHeightOfToastsContainer() {
                        if (this.toasts.length === 0) {
                            this.$el.style.height = '0px'
                            return
                        }

                        const lastToast = this.toasts[this.toasts.length - 1]
                        const lastToastRectangle = document
                            .getElementById(lastToast.id)
                            .getBoundingClientRect()

                        const firstToast = this.toasts[0]
                        const firstToastRectangle = document
                            .getElementById(firstToast.id)
                            .getBoundingClientRect()

                        if (this.toastsHovered) {
                            if (this.position.includes('bottom')) {
                                this.$el.style.height =
                                    firstToastRectangle.top +
                                    firstToastRectangle.height -
                                    lastToastRectangle.top +
                                    'px'
                            } else {
                                this.$el.style.height =
                                    lastToastRectangle.top +
                                    lastToastRectangle.height -
                                    firstToastRectangle.top +
                                    'px'
                            }
                        } else {
                            this.$el.style.height =
                                firstToastRectangle.height + 'px'
                        }
                    },

                    init() {
                        this.expanded = this.layout === 'expanded'
                        this.stackToasts()
                        this.$watch('toastsHovered', function (value) {
                            if (this.layout === 'default') {
                                if (this.position.includes('bottom')) {
                                    this.resetBottom()
                                } else {
                                    this.resetTop()
                                }

                                if (value) {
                                    // calculate the new positions
                                    this.expanded = true
                                    if (this.layout === 'default') {
                                        this.stackToasts()
                                    }
                                } else {
                                    if (this.layout === 'default') {
                                        this.expanded = false
                                        //setTimeout(function(){
                                        this.stackToasts()
                                        //}, 10);

                                        const self = this
                                        setTimeout(function () {
                                            self.stackToasts()
                                        }, 10)
                                    }
                                }
                            }
                        })
                    },
                }
            },
            '@set-toasts-layout.window'(event) {
                const layout = event.detail.layout
                this.expanded = layout === 'expanded'
                this.stackToasts()
            },
            '@toast-show.window'(event) {
                event.stopPropagation()
                if (event.detail.position) {
                    const position = event.detail.position
                }
                this.toasts.unshift({
                    id: 'toast-' + Math.random().toString(16).slice(2),
                    show: false,
                    message: event.detail.message,
                    description: event.detail.description,
                    type: event.detail.type,
                    html: event.detail.html,
                })
            },
            '@mouseenter'() {
                this.toastsHovered = true
            },
            '@mouseleave'() {
                this.toastsHovered = false
            },
            ':class'() {
                return {
                    'right-0 top-0 sm:mt-6 sm:mr-6':
                        this.position === 'top-right',
                    'left-0 top-0 sm:mt-6 sm:ml-6':
                        this.position === 'top-left',
                    'left-1/2 -translate-x-1/2 top-0 sm:mt-6':
                        this.position === 'top-center',
                    'right-0 bottom-0 sm:mr-6 sm:mb-6':
                        this.position === 'bottom-right',
                    'left-0 bottom-0 sm:ml-6 sm:mb-6':
                        this.position === 'bottom-left',
                    'left-1/2 -translate-x-1/2 bottom-0 sm:mb-6':
                        this.position === 'bottom-center',
                }
            },
        })
    }

    const handleToast = (el, Alpine, { id }) => {
        Alpine.bind(el, {
            ':id': 'id',
            'x-data'() {
                return {
                    id,
                    toastHovered: false,

                    get toast() {
                        return this.toasts.find((toast) => toast.id === this.id)
                    },

                    init() {
                        if (this.position.includes('bottom')) {
                            this.$el.firstElementChild.classList.add(
                                'toast-bottom',
                            )
                            this.$el.firstElementChild.classList.add(
                                'opacity-0',
                                'translate-y-full',
                            )
                        } else {
                            this.$el.firstElementChild.classList.add(
                                'opacity-0',
                                '-translate-y-full',
                            )
                        }
                        setTimeout(function () {
                            setTimeout(function () {
                                if (this.position.includes('bottom')) {
                                    this.$el.firstElementChild.classList.remove(
                                        'opacity-0',
                                        'translate-y-full',
                                    )
                                } else {
                                    this.$el.firstElementChild.classList.remove(
                                        'opacity-0',
                                        '-translate-y-full',
                                    )
                                }
                                this.$el.firstElementChild.classList.add(
                                    'opacity-100',
                                    'translate-y-0',
                                )

                                setTimeout(function () {
                                    this.stackToasts()
                                }, 10)
                            }, 5)
                        }, 50)

                        setTimeout(function () {
                            setTimeout(function () {
                                this.$el.firstElementChild.classList.remove(
                                    'opacity-100',
                                )
                                this.$el.firstElementChild.classList.add(
                                    'opacity-0',
                                )
                                if (this.toasts.length === 1) {
                                    this.$el.firstElementChild.classList.remove(
                                        'translate-y-0',
                                    )
                                    this.$el.firstElementChild.classList.add(
                                        '-translate-y-full',
                                    )
                                }
                                setTimeout(function () {
                                    this.deleteToastWithId(this.id)
                                }, 300)
                            }, 5)
                        }, 4000)
                    },
                }
            },
            '@mouseover'() {
                this.toastHovered = true
            },
            '@mouseleave'() {
                this.toastHovered = false
            },
            ':class'() {
                return { 'toast-no-description': !this.toast.description }
            },
        })
    }

    Alpine.directive(
        'sonner',
        (el, { value, expression }, { Alpine, evaluate }) => {
            const params = expression ? evaluate(expression) : {}

            if (!value) handleRoot(el, Alpine, params)
            else if (value === 'toast') handleToast(el, Alpine, params)
            else {
                console.warn(`Unknown sonner directive value: ${value}.`)
            }
        },
    ).before('bind')
}

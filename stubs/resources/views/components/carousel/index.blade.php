@use('Nuxtifyts\Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => 'div',
    'orientation' => 'horizontal',
    'options' => [
        'direction' => 'ltr',
        'loop' => false,
    ],
    'pluginsObjectName' => '__carouselPlugins',
    'pluginNames' => [],
])

@php(throw_unless(
    ! array_key_exists('orientation', $options),
    InvalidComponentException::invalidCarouselOrientationOption('The "orientation" option can not be passed from the "options" array. Instead, use the "orientation" prop directly.')
))

@php($attributes = $attributes
    ->twMerge('relative')
    ->merge([
        'as' => $as,
        'role' => 'region',
        'data-slot' => 'carousel',
        'aria-roledescription' => __('Carousel'),
        'x-carousel' => Js::from([
            ...$options,
            'orientation' => $orientation,
            'direction' => $options['direction'] ?? 'ltr',
            'loop' => $options['loop'] ?? false,
            'pluginsObjectName' => $pluginsObjectName,
            'pluginNames' => $pluginNames
        ])
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@pushLumenScriptsOnce
<script type="text/javascript" data-navigate-once="true">
    document.addEventListener(typeof Alpine === 'undefined' ? 'alpine:init' : 'livewire:navigated', () => {
        const handleRoot = (el, Alpine, { orientation, direction, loop, pluginNames, pluginsObjectName }) => {
            const plugins = pluginNames.map(name => window[pluginsObjectName]?.[name]).filter(Boolean);

            Alpine.bind(el, {
                'x-effect'() {
                    this.__emblaApi?.reInit(this.__emblaOptions, this.plugins);
                },
                'x-data'() {
                    return {
                        __emblaApi: null,
                        __canScrollNext: false,
                        __canScrollPrev: false,
                        orientation,
                        loop,
                        direction,
                        plugins,

                        get __content() {
                            return this.$refs.content;
                        },

                        get __emblaOptions() {
                            return {
                                loop: this.loop,
                                direction: this.direction,
                                axis: this.orientation === 'horizontal' ? 'x' : 'y',
                                container: this.__content.firstChild,
                            };
                        },

                        __updateCanScroll() {
                            this.__canScrollNext = this.__emblaApi?.canScrollNext() ?? false;
                            this.__canScrollPrev = this.__emblaApi?.canScrollPrev() ?? false;
                        },

                        init() {
                            this.$el.removeAttribute('x-carousel');
                            
                            this.$nextTick(() => {
                                this.__emblaApi = this.$emblaApi(this.$el, this.__emblaOptions, this.plugins);
                                this.__emblaApi.on('select', () => this.__updateCanScroll());
                                this.__emblaApi.on('init', () => this.__updateCanScroll());
                            });
                        },

                        destroy() {
                            this.__emblaApi?.destroy();
                        }
                    }
                }
            });
        };

        const handleContent = (el, Alpine) => {
            Alpine.bind(el, {
                'x-ref': 'content',
                'x-data': '',
                'x-init'() {
                    this.$el.removeAttribute('x-carousel:content');
                }
            });
        }

        const handleNext = (el, Alpine) => {
            Alpine.bind(el, {
                '@click': '__emblaApi?.scrollNext()',
                ':disabled': '! __canScrollNext',
                'x-data': '',
                'x-init'() {
                    this.$el.removeAttribute('x-carousel:next');
                }
            });
        };

        const handlePrevious = (el, Alpine) => {
            Alpine.bind(el, {
                '@click': '__emblaApi?.scrollPrev()',
                ':disabled': '! __canScrollPrev',
                'x-data': '',
                'x-init'() {
                    this.$el.removeAttribute('x-carousel:previous');
                }
            });
        };

        Alpine.directive('carousel', (e, {value, expression}, {Alpine, evaluate}) => {
            const params = expression ? evaluate(expression) : {};

            if (! value) handleRoot(e, Alpine, params);
            else if (value === 'content') handleContent(e, Alpine);
            else if (value === 'next') handleNext(e, Alpine);
            else if (value === 'previous') handlePrevious(e, Alpine);
            else {
                console.warn(`Unknown carousel directive value: ${value}`);
            }
        });
    }, { once: true });
</script>
@endPushLumenScriptsOnce

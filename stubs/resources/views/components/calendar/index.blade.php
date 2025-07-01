@props([
    'as' => 'div',
    'settings' => [],
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'calendar',
        'x-calendar' => Js::from([
            'settings' => [
                ...$settings,
                'styles' => [
                    ...$settings['styles'] ?? [],
                    'calendar' => twMerge(
                        $settings['styles']['calendar'] ?? '',
                        'group:calendar p-3 gap-4 bg-background',
                        $attributes->get('class'),
                    ),
                    'controls' => twMerge(
                        $settings['styles']['controls'] ?? '',
                        'p-3'
                    ),
                    'grid' => twMerge(
                        $settings['styles']['grid'] ?? '',
                        'gap-4',
                    ),
                    'column' => twMerge(
                        $settings['styles']['column'] ?? '',
                        'gap-4',
                    ),
                    'header' => twMerge(
                        $settings['styles']['header'] ?? '',
                        'data-[vc=header]:mb-0 px-1',
                    ),
                    'headerContent' => twMerge(
                        $settings['styles']['headerContent'] ?? '',
                        'gap-1.5',
                    ),
                    'month' => twMerge(
                        $settings['styles']['month'] ?? '',
                        'has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 text-sm font-medium px-1.5',
                    ),
                    'year' => twMerge(
                        $settings['styles']['year'] ?? '',
                        'has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 text-sm font-medium px-1.5',
                    ),
                    'arrowPrev' => twMerge(
                        $settings['styles']['arrowPrev'] ?? '',
                        'data-[vc-arrow]:size-8 hover:bg-muted rounded-lg',
                        'before:bg-no-repeat before:bg-center before:size-4 before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2',
                        "before:bg-[image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzBmMTcyYSIgZD0iTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zIi8+PC9zdmc+)]",
                        "dark:before:bg-[image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zIi8+PC9zdmc+)]",
                    ),
                    'arrowNext' => twMerge(
                        $settings['styles']['arrowNext'] ?? '',
                        'data-[vc-arrow]:size-8 hover:bg-muted rounded-lg',
                        'before:bg-no-repeat before:bg-center before:size-4 before:top-1/2 before:-translate-y-1/2 before:right-1/2 before:translate-x-1/2',
                        'before:bg-[image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzBmMTcyYSIgZD0iTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zIi8+PC9zdmc+)]',
                        "dark:before:bg-[image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zIi8+PC9zdmc+')]",
                    ),
                    'wrapper' => twMerge(
                        $settings['styles']['wrapper'] ?? '',
                        'w-fit mx-auto',
                    ),
                    'week' => twMerge(
                        $settings['styles']['week'] ?? '',
                        'mb-2',
                    ),
                    'weekDay' => twMerge(
                        $settings['styles']['weekDay'] ?? '',
                        'text-muted-foreground rounded-md font-normal text-[0.8rem] select-none',
                    ),
                    'dates' => twMerge(
                        $settings['styles']['dates'] ?? '',
                        'gap-y-2 gap-x-0',
                    ),
                    'date' => twMerge(
                        $settings['styles']['date'] ?? '',
                        'group/calendar-date',
                        'hover:bg-muted rounded-md size-8 p-0',
                    ),
                    'dateBtn' => twMerge(
                        $settings['styles']['dateBtn'] ?? '',
                        'text-sm size-8 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2 focus:border-ring focus:ring-ring/50 focus:ring-2',
                        'group-[:is([data-vc-date-month=prev],[data-vc-date-month=next],[data-vc-date-disabled])]/calendar-date:text-muted-foreground',
                        'group-[:is([data-vc-date-today]):not([data-vc-date-selected])]/calendar-date:bg-muted group-[:is([data-vc-date-today]):not([data-vc-date-selected])]/calendar-date:font-normal',
                        'group-data-[vc-date-selected]/calendar-date:bg-primary group-data-[vc-date-selected]/calendar-date:text-primary-foreground',
                        'group-data-[vc-date-selected=middle]/calendar-date:bg-accent group-data-[vc-date-selected=middle]/calendar-date:text-accent-foreground',
                    ),
                    'monthsMonth' => twMerge(
                        $settings['styles']['monthsMonth'] ?? '',
                        'font-normal'
                    ),
                    'yearsYear' => twMerge(
                        $settings['styles']['yearsYear'] ?? '',
                        'font-normal'
                    ),
                ]
            ]
        ]),
    ]))

<x-lumen::primitive :attributes="$attributes" />

@pushLumenScriptsOnce
<script type="text/javascript" data-navigate-once="true">
    document.addEventListener(typeof Alpine === 'undefined' ? 'alpine:init' : 'livewire:navigated', () => {
        const handleRoot = (el, Alpine, { settings }) => {
            Alpine.bind(el, {
                '@keydown.down.prevent': '',
                '@keydown.up.prevent': '',
                'x-data'() {
                    return {
                        __values: [],
                        __calendarSettings: settings,
                        __calendar: undefined,

                        init() {
                            this.$el.removeAttribute('x-calendar');

                            this.$nextTick(() => {
                                this.__calendarSettings.selectedDates = this.$calendarUtils.parseDates(this.__calendarSettings.selectedDates ?? []);
                                this.__values = this.__calendarSettings.selectedDates;

                                this.__calendar = this.$calendar(this.$el, {
                                    ...this.__calendarSettings,
                                    onClickDate: (self, event) => { 
                                        this.__values = self.context.selectedDates;
                                    }
                                });

                                this.__calendar.init();
                            });

                            this.$watch('__values', (newValues) => {
                                if (
                                    this.__calendar
                                    && JSON.stringify(newValues) !== JSON.stringify(this.__calendar.context.selectedDates)
                                ) {
                                    this.__calendar.set({ selectedDates: newValues });
                                }
                            });
                        },

                        destroy() {
                            this.__calendar?.destroy();
                        }
                    };
                },
                'x-modelable': '__values',
            });
        };

        Alpine.directive('calendar', (el, {value, expression}, {Alpine, evaluate}) => {
            const params = expression ? evaluate(expression) : {};

            if (! value) handleRoot(el, Alpine, params);
            else {
                console.warn(`Unknown calendar directive value: ${value}`);
            }
        }).before('bind');
    }, { once: true });
</script>
@endPushLumenScriptsOnce

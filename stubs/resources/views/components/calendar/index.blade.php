@props([
    'as' => 'div',
    'settings' => [],
])

@php($componentParams = Js::from([
    'settings' => [
        ...$settings,
        'styles' => [
            ...$settings['styles'] ?? [],
            'calendar' => tw_merge(
                $settings['styles']['calendar'] ?? '',
                'group:calendar p-3 gap-4',
                $attributes->get('class'),
            ),
            'controls' => tw_merge(
                $settings['styles']['controls'] ?? '',
                'p-3'
            ),
            'grid' => tw_merge(
                $settings['styles']['grid'] ?? '',
                'gap-4',
            ),
            'column' => tw_merge(
                $settings['styles']['column'] ?? '',
                'gap-4',
            ),
            'header' => tw_merge(
                $settings['styles']['header'] ?? '',
                'data-[vc=header]:mb-0 px-1',
            ),
            'headerContent' => tw_merge(
                $settings['styles']['headerContent'] ?? '',
                'gap-1.5',
            ),
            'month' => tw_merge(
                $settings['styles']['month'] ?? '',
                'has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 text-sm font-medium px-1.5',
            ),
            'year' => tw_merge(
                $settings['styles']['year'] ?? '',
                'has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 text-sm font-medium px-1.5',
            ),
            'arrowPrev' => tw_merge(
                $settings['styles']['arrowPrev'] ?? '',
                'data-[vc-arrow]:size-8 hover:bg-muted rounded-lg',
                'before:bg-no-repeat before:bg-center before:size-4 before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2',
                "before:bg-[image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzBmMTcyYSIgZD0iTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zIi8+PC9zdmc+)]",
                "dark:before:bg-[image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zIi8+PC9zdmc+)]",
            ),
            'arrowNext' => tw_merge(
                $settings['styles']['arrowNext'] ?? '',
                'data-[vc-arrow]:size-8 hover:bg-muted rounded-lg',
                'before:bg-no-repeat before:bg-center before:size-4 before:top-1/2 before:-translate-y-1/2 before:right-1/2 before:translate-x-1/2',
                'before:bg-[image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzBmMTcyYSIgZD0iTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zIi8+PC9zdmc+)]',
                "dark:before:bg-[image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDE2Yy0uMyAwLS41LS4xLS43LS4zbC02LTZjLS40LS40LS40LTEgMC0xLjRzMS0uNCAxLjQgMGw1LjMgNS4zIDUuMy01LjNjLjQtLjQgMS0uNCAxLjQgMHMuNCAxIDAgMS40bC02IDZjLS4yLjItLjQuMy0uNy4zIi8+PC9zdmc+')]",
            ),
            'wrapper' => tw_merge(
                $settings['styles']['wrapper'] ?? '',
                'w-fit mx-auto',
            ),
            'week' => tw_merge(
                $settings['styles']['week'] ?? '',
                'mb-2',
            ),
            'weekDay' => tw_merge(
                $settings['styles']['weekDay'] ?? '',
                'text-muted-foreground rounded-md font-normal text-[0.8rem] select-none',
            ),
            'dates' => tw_merge(
                $settings['styles']['dates'] ?? '',
                'gap-y-2 gap-x-0',
            ),
            'date' => tw_merge(
                $settings['styles']['date'] ?? '',
                'group/calendar-date',
                'hover:bg-muted rounded-md size-8 p-0',
            ),
            'dateBtn' => tw_merge(
                $settings['styles']['dateBtn'] ?? '',
                'text-sm size-8 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2 focus:border-ring focus:ring-ring/50 focus:ring-2',
                'group-[:is([data-vc-date-month=prev],[data-vc-date-month=next],[data-vc-date-disabled])]/calendar-date:text-muted-foreground',
                'group-[:is([data-vc-date-today]):not([data-vc-date-selected])]/calendar-date:bg-muted group-[:is([data-vc-date-today]):not([data-vc-date-selected])]/calendar-date:font-normal',
                'group-data-[vc-date-selected]/calendar-date:bg-primary group-data-[vc-date-selected]/calendar-date:text-primary-foreground',
                'group-data-[vc-date-selected=middle]/calendar-date:bg-accent group-data-[vc-date-selected=middle]/calendar-date:text-accent-foreground',
                'group-data-[vc-date-hover]/calendar-date:bg-accent group-data-[vc-date-hover]/calendar-date:text-accent-foreground',
                'group-data-[vc-date-hover=late]/calendar-date:bg-accent group-data-[vc-date-hover=late]/calendar-date:text-accent-foreground',
            ),
            'monthsMonth' => tw_merge(
                $settings['styles']['monthsMonth'] ?? '',
                'font-normal'
            ),
            'yearsYear' => tw_merge(
                $settings['styles']['yearsYear'] ?? '',
                'font-normal'
            ),
        ]
    ]
]))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'calendar',
        'x-data' => "calendar($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes" />

export const registerComponent = () => {
    Alpine.data('calendar', ({ settings }) => ({
        __values: [],
        __calendarSettings: settings,
        __calendar: undefined,

        init() {
            this.$nextTick(() => {
                this.__calendarSettings.selectedDates =
                    this.$calendarUtils.parseDates(
                        this.__calendarSettings.selectedDates ?? [],
                    )
                this.__values = this.__calendarSettings.selectedDates

                this.__calendar = this.$calendar(this.$el, {
                    ...this.__calendarSettings,
                    onClickDate: (self, event) => {
                        this.__values = self.context.selectedDates
                    },
                })

                this.__calendar.init()
            })

            this.$watch('__values', (newValues) => {
                if (
                    this.__calendar &&
                    JSON.stringify(newValues) !==
                        JSON.stringify(this.__calendar.context.selectedDates)
                ) {
                    this.__calendar.set({
                        selectedDates: newValues,
                    })
                }
            })

            Alpine.bind(this.$el, {
                '@keydown.down.prevent': '',
                '@keydown.up.prevent': '',
                'x-modelable': '__values',
            })
        },

        destroy() {
            this.__calendar?.destroy()
        },
    }))
}

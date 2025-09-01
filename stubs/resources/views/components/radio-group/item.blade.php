@props([
    'as' => 'button',
    'value',
])

@aware([
    'disabled' => false,
])

@php($componentParams = Js::from(compact('value', 'disabled')))

@php($attributes = $attributes
    ->twMerge('border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50')
    ->merge([
        'as' => $as,
        'type' => 'button',
        'role' => 'radio',
        'data-slot' => 'radio-group-item',
        'data-value' => $value,
        'tabindex' => '-1',
        'x-radio-group:item' => Js::from(compact('value', 'disabled')),
        'x-data' => "radioGroupItem($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    <template x-if="checked">
        <span
            data-state="checked"
            data-slot="radio-group-indicator"
            class="relative flex items-center justify-center"
            style="pointer-events: none;"
        >
            <x-lucide-circle class="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
        </span>
    </template>
</x-lumen::primitive>

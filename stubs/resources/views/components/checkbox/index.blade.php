@props([
    'as' => 'button',
    'indicatorAs' => 'span',
    'defaultChecked' => false,
    'disabled' => false,
])

@php($attributes = $attributes
    ->twMerge('peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50')
    ->merge([
        'as' => $as,
        'type' => 'button',
        'role' => 'checkbox',
        'x-checkbox' => Js::from(compact('defaultChecked', 'disabled')),
    ]))

<x-lumen::primitive :attributes="$attributes">
    <template x-if="checked">
        <x-lumen::primitive
            :as="$indicatorAs"
            data-slot="checkbox-indicator"
            data-state="checked"
            class="flex items-center justify-center text-current transition-none"
            style="pointer-events: none;"
        >
            <x-lucide-check class="size-3.5" />
        </x-lumen::primitive>
    </template>
</x-lumen::primitive>

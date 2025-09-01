@props([
    'as' => 'button',
    'thumbAs' => 'span',
    'disabled' => false,
    'defaultChecked' => false,
])

@php($componentParams = Js::from(compact('defaultChecked', 'disabled')))

@php($attributes = $attributes
    ->twMerge('peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50')
    ->merge([
        'as' => $as,
        'type' => 'button',
        'role' => 'switch',
        'data-slot' => 'switch',
        'x-data' => "switchInput($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    <x-lumen::primitive
        :as="$thumbAs"
        data-slot="switch-thumb"
        x-bind:data-state="checked ? 'checked' : 'unchecked'"
        class="bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
    />
</x-lumen::primitive>

@props([
    'as' => 'div',
    // The value of the tab to select by default, if uncontrolled.
    'defaultValue' => null,
    // The orientation the tabs are laid out in.
    'orientation' => 'horizontal',
    // The direction of navigation between toolbar items.
    'dir' => 'ltr',
    // Wether a tab is activated automatically or manually.
    'activationMode' => 'automatic'
])

@php($attributes = $attributes
    ->twMerge('flex flex-col gap-2')
    ->merge([
        'as' => $as,
        'x-tab' => Js::from(compact('defaultValue', 'orientation', 'dir', 'activationMode')),
        'data-slot' => 'tabs',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

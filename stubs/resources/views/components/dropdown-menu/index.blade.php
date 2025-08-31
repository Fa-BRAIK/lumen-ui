@props([
    'as' => 'div',
    'defaultOpen' => false,
    'modal' => true,
    'dir' => 'ltr',
])

@php($componentParams = Js::from(compact('defaultOpen', 'dir', 'modal')))

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'dropdown-menu',
        'style' => Arr::toCssStyles([
            '--lumen-dropdown-menu-available-height: calc(100vh - 2rem)',
            '--lumen-dropdown-menu-transform-origin:' . ($dir === 'rtl' ? 'right' : 'left'),
        ]),
        'x-data' => "dropdownMenu($componentParams)",
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

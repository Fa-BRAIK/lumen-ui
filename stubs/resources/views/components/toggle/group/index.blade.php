@use('Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => 'div',
    // The variant applied to the toggle buttons, can be 'default' or 'outline'
    'variant' => 'default',
    // The size of the toggle buttons, can be 'sm', 'base' or 'lg'
    'size' => 'base',
    // The type of toggle group, can be 'single' or 'multiple'
    'type' => 'multiple',
    // The default value for the toggle group, 
    'defaultValue' => [],
    // When set to false, navigating using arrow keys will be disabled 
    'rovingFocus' => true,
    // The orientation of the toggle group, can be 'horizontal' or 'vertical'
    'orientation' => 'horizontal',
    // The direction of the toggle group, can be 'ltr' or 'rtl'
    'dir' => 'ltr',
    // When set to true, the toggle group will loop around when navigating with arrow keys
    'loop' => true,
    // When set to true the toggle group will be disabled
    'disabled' => false
])

@php(throw_unless(
    in_array($type, ['single', 'multiple']),
    InvalidComponentException::invalidToggleGroupType()
))

@php($attributes = $attributes
    ->twMerge('group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs')
    ->merge([
        'as' => $as,
        'data-slot' => 'toggle-group',
        'data-variant' => $variant,
        'data-size' => $size,
        'tabindex' => '-1',
        "x-toggle-group.$type" => Js::from(compact('defaultValue', 'rovingFocus', 'orientation', 'dir', 'loop', 'disabled'))
    ])
    ->exceptProps(['default-value']))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@use('Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => 'span',
    'min' => 0,
    'max' => 100,
    'step' => 1,
    // The minimum permitted "step" between the thumbs
    'minStepBetweenThumbs' => 0,
    // The default values for the slider
    'defaultValue' => [],
    // When set to false, navigating using arrow keys will be disabled 
    'rovingFocus' => true,
    // The orientation of the toggle group, can be 'horizontal' or 'vertical'
    'orientation' => 'horizontal',
    // The direction of the toggle group, can be 'ltr' or 'rtl'
    'dir' => 'ltr',
    // When set to false, the component will be disabled
    'disabled' => false,
])

@php(throw_unless(
    $step > 0,
    InvalidComponentException::invalidSliderStep()
))

@php($attributes = $attributes
    ->twMerge('relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col')
    ->merge([
        'as' => $as,
        'data-slot' => 'slider',
        'x-slider' => Js::from(compact('min', 'max', 'step', 'minStepBetweenThumbs', 'defaultValue', 'rovingFocus', 'orientation', 'dir', 'disabled')),
        'style' => Arr::toCssStyles([
            '--lumen-slider-thumb-transform-x: translateX(-50%)',
            '--lumen-slider-thumb-transform: translate(-50%, 50%)',
        ])
    ])
    ->exceptProps(['default-value']))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

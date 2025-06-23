@props([
    'as' => 'svg',
    'width' => 10,
    'height' => 5,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'height' => $height,
        'width' => $width,
        'viewBox' => '0 0 30 10',
        'data-slot' => 'arrow',
        'preserveAspectRatio' => 'none',
    ]))

<x-lumen::primitive :attributes="$attributes">
    @if ($slot->isNotEmpty())
        {{ $slot }}
    @else
        <polygon points="0,0 30,0 15,10" />
    @endif
</x-lumen::primitive>

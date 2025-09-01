@props([
    'as' => 'dialog',
])

@php($attributes = $attributes
    ->twMerge('fixed open:grid top-1/2 left-1/2 p-6 -translate-x-1/2 -translate-y-1/2 bg-background backdrop:bg-black/50 shadow-lg gap-4 border w-full max-w-[calc(100%-2rem)] sm:max-w-lg duration-200 rounded-lg')
    ->merge([
        'as' => $as,
        'data-slot' => 'alert-dialog',
        'x-data' => 'alertDialogContent',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

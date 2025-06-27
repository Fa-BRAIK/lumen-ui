@props([
    'as' => 'dialog',
    'showCloseButton' => true,
])

@php($attributes = $attributes
    ->twMerge('fixed open:grid top-1/2 left-1/2 p-6 -translate-x-1/2 -translate-y-1/2 bg-background backdrop:bg-black/50 shadow-lg gap-4 border w-full max-w-[calc(100%-2rem)] sm:max-w-lg duration-200 rounded-lg')
    ->merge([
        'as' => $as,
        'x-dialog:content' => '',
        'data-slot' => 'dialog',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}

    @if ($showCloseButton)
        <x-lumen::dialog.close class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <x-lucide-x />

            <span class="sr-only">{{ __('Close') }}</span>
        </x-lumen::dialog.close>
    @endif
</x-lumen::primitive>

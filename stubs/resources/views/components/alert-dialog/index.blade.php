@props([
    'as' => 'div',
    'defaultOpen' => false,
])

@php($attributes = $attributes
    ->merge([
        'as' => $as,
        'data-slot' => 'alert-dialog-container',
        'x-alert-dialog' => '',
    ]))

<x-lumen::primitive :attributes="$attributes">
    {{ $slot }}
</x-lumen::primitive>

@pushLumenScriptsOnce
<script type="text/javascript" data-navigate-once="true">
    
</script>
@endPushLumenScriptsOnce

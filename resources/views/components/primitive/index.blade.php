@use('Nuxtifyts\Lumen\Support\Blade\Components\Primitive\AsTag')
@use('Nuxtifyts\Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => AsTag::Div,
    'asChild' => false,
])

@php(throw_unless(
    $asChild 
    || (($as = is_string($as) || is_numeric($as) ? AsTag::tryFrom($as) : $as) instanceof AsTag),
    InvalidComponentException::invalidPrimitiveTag()
))

@if ($asChild)
   {!! app('lumen.components')->parseSlotWithAdditionalAttributes($slot, $attributes) !!}
@else
    @if ($as->isSelfClosing())
        <{{ $as->value }} {!! html_entity_decode($attributes) !!}/>
    @else
        <{{ $as->value }} {!! html_entity_decode($attributes) !!}>{{ $slot }}</{{ $as->value }}>
    @endif
@endif


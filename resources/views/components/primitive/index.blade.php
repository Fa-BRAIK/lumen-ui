@use('Nuxtifyts\Lumen\Support\Blade\Components\Primitive\AsTag')
@use('Nuxtifyts\Lumen\Support\Blade\Components\Exceptions\InvalidComponentException')

@props([
    'as' => AsTag::Div,
])

@php(throw_unless(
    ($as = is_string($as) || is_numeric($as) ? AsTag::tryFrom($as) : $as) instanceof AsTag,
    InvalidComponentException::invalidPrimitiveTag()
))

@if ($as->isSelfClosing())
    <{{ $as->value }} {!! html_entity_decode($attributes) !!}/>
@else
    <{{ $as->value }} {!! html_entity_decode($attributes) !!}>{{ $slot }}</{{ $as->value }}>
@endif

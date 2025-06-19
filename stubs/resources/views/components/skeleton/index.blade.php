@props([
    'as' => 'div'
])

@php($attributes = $attributes
    ->twMerge('animate-pulse rounded-md bg-muted')
    ->merge(['as' => $as]))

<x-lumen::primitive :attributes="$attributes" />

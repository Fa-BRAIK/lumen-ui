<?php

declare(strict_types=1);

/**
 * Get the available container instance.
 *
 * @template TClass of object
 *
 * @param  string|class-string<TClass>|null  $abstract
 * @return ($abstract is "lumen" ? \Nuxtifyts\Lumen\Lumen
 *      : ($abstract is "lumen.assets" ? \Nuxtifyts\Lumen\Support\Assets\Manager
 *      : ($abstract is "livewire" ? \Livewire\Livewire
 *      : ($abstract is class-string<TClass> ? TClass
 *      : ($abstract is null ? \Illuminate\Foundation\Application : mixed)))))
 */
function app($abstract = null, array $parameters = []) {}

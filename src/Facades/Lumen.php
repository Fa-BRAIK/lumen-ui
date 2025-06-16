<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method \Nuxtifyts\Lumen\Support\Blade\Directives directives()
 * @method \Nuxtifyts\Lumen\Support\Blade\Components components()
 * @method \Nuxtifyts\Lumen\Support\ClassBuilder classes(array<array-key, mixed> $classes = [])
 * @method \Nuxtifyts\Lumen\Support\Assets\Manager assets()
 *
 * @see \Nuxtifyts\Lumen\Lumen
 */
class Lumen extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \Nuxtifyts\Lumen\Lumen::class;
    }
}

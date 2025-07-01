<?php

declare(strict_types=1);

namespace Lumen\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method \Lumen\Support\Blade\Directives directives()
 * @method \Lumen\Support\Blade\Components components()
 * @method \Lumen\Support\ClassBuilder classes(array<array-key, mixed> $classes = [])
 * @method \Lumen\Support\Assets\Manager assets()
 *
 * @see \Lumen\Lumen
 */
class Lumen extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \Lumen\Lumen::class;
    }
}

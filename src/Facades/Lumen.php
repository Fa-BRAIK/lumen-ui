<?php

namespace Nuxtifyts\Lumen\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Nuxtifyts\Lumen\Lumen
 */
class Lumen extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \Nuxtifyts\Lumen\Lumen::class;
    }
}

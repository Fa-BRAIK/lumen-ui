<?php

declare(strict_types=1);

namespace Lumen;

use Lumen\Support\Assets\Manager;
use Lumen\Support\Blade\Components;
use Lumen\Support\Blade\Directives;
use Lumen\Support\ClassBuilder;

class Lumen
{
    /**
     * @param  string|array<array-key, mixed>  $classes
     */
    public function classes(string|array $classes = []): ClassBuilder
    {
        return ClassBuilder::make($classes);
    }

    public function directives(): Directives
    {
        return app(Directives::class);
    }

    public function components(): Components
    {
        return app(Components::class);
    }

    public function assets(): Manager
    {
        return app(Manager::class);
    }
}

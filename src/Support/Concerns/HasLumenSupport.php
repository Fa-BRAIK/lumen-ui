<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support\Concerns;

use Nuxtifyts\Lumen\Lumen;
use Nuxtifyts\Lumen\Support\Assets\Manager;
use Nuxtifyts\Lumen\Support\Blade\Components;
use Nuxtifyts\Lumen\Support\Blade\Directives;

trait HasLumenSupport
{
    private function registerAliases(): static
    {
        app()->alias(Lumen::class, 'lumen');
        app()->alias(Manager::class, 'lumen.assets');
        app()->alias(Components::class, 'lumen.components');

        return $this;
    }

    private function registerSingletons(): static
    {
        app()->singleton(Lumen::class);
        app()->singleton(Directives::class);
        app()->singleton(Components::class);
        app()->singleton(Manager::class);

        return $this;
    }

    private function bootBladeDirectives(): static
    {
        app('lumen')->directives()->boot();

        return $this;
    }

    private function bootBladeComponents(): static
    {
        app('lumen')->components()->boot();

        return $this;
    }

    private function bootLumenAssets(): static
    {
        app('lumen')->assets()->boot();

        return $this;
    }
}

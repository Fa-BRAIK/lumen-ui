<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support\Blade;

use Illuminate\Support\Facades\Blade;

class Components
{
    public function boot(): void
    {
        if ( ! config('lumen.blade.components.autoload.enabled', true)) {
            return;
        }

        if (file_exists(resource_path('views/lumen'))) {
            Blade::anonymousComponentPath(
                resource_path('views/lumen'),
                config('lumen.blade.components.autoload.namespace')
            );
        }

        Blade::anonymousComponentPath(
            __DIR__ . '/../../../stubs/resources/views/components',
            config('lumen.blade.components.autoload.namespace')
        );
    }

    public function dynamicComponentName(string $name): string
    {
        return is_string($namespace = config('lumen.blade.components.autoload.namespace'))
            ? "{$namespace}::{$name}"
            : $name;
    }
}

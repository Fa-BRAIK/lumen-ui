<?php

declare(strict_types=1);

namespace Lumen\Support\Blade;

use Illuminate\Support\Facades\Blade;
use Illuminate\View\ComponentAttributeBag;
use Illuminate\View\ComponentSlot;

class Components
{
    public function boot(): void
    {
        if ( ! config('lumen.blade.components.autoload.enabled', true)) {
            return;
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

    /**
     * TODO - Experimental feature, will most likely be adjusted/improved in the future.
     */
    public function parseSlotWithAdditionalAttributes(
        ComponentSlot $slot,
        ComponentAttributeBag $attributes
    ): string {
        return preg_replace_callback(
            '/^(\s*<[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?)(>)/',
            function ($matches) use ($attributes) {
                $openTag = $matches[1];
                $closeChar = $matches[2];

                // Add attributes
                $attributeString = '';
                foreach ($attributes->getAttributes() as $name => $value) {
                    $attributeString .= ' ' . $name . '="' . htmlspecialchars($value, ENT_QUOTES) . '"';
                }

                return $openTag . $attributeString . $closeChar;
            },
            $slot->toHtml(),
            1
        );
    }
}

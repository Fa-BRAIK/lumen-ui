<?php

declare(strict_types=1);

namespace Lumen\Support\Assets;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Lumen\Http\Controllers\LumenScriptsController;

class Manager
{
    protected const string MANIFEST_PATH = __DIR__ . '/../../../dist/.vite/manifest.json';

    public function boot(): void
    {
        $this->registerRoutes();
    }

    public function injectMainScript(): string
    {
        return $this->injectScript('lumen');
    }

    public function injectLumenComponents(): string
    {
        return $this->injectScript('components');
    }

    public function resolveScriptId(string $name): ?string
    {
        $manifest = json_decode(File::get(self::MANIFEST_PATH), true);

        $entryPoint = Arr::first(
            $manifest,
            static fn (array $entryData) => $name === Arr::string($entryData, 'name')
        );

        if ( ! $entryPoint) {
            return null;
        }

        $fileNameExploded = explode('.', Arr::string($entryPoint, 'file'));

        return $fileNameExploded[count($fileNameExploded) - 2];
    }

    protected function registerRoutes(): void
    {
        Route::prefix('lumen')->group(static function (): void {
            Route::prefix('scripts')->group(static function (): void {
                Route::get('{name}', LumenScriptsController::class)->name('lumen.scripts.get');
            });
        });
    }

    private function injectScript(string $name): string
    {
        $id = $this->resolveScriptId($name);
        $src = route('lumen.scripts.get', compact('name', 'id'));

        return "<script src=\"{$src}\" data-navigate-once></script>";
    }
}

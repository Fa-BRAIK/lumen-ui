<?php

declare(strict_types=1);

namespace Lumen\Support\Assets;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Lumen\Http\Controllers\LumenScriptsController;

class Manager
{
    public function boot(): void
    {
        $this->registerRoutes();
    }

    public function prepareMainScript(): string
    {
        $manifestPath = __DIR__ . '/../../../dist/.vite/manifest.json';
        $manifest = json_decode(File::get($manifestPath), true);

        $entryPoint = Arr::first(
            $manifest,
            static fn (array $entryData) => 'lumen' === Arr::string($entryData, 'name')
        );

        $fileNameExploded = explode('.', Arr::string($entryPoint, 'file'));
        $hash = $fileNameExploded[count($fileNameExploded) - 2];

        $src = route('lumen.scripts.get', ['name' => 'lumen', 'id' => $hash]);

        return "<script src=\"{$src}\" data-navigate-once></script>";
    }

    protected function registerRoutes(): void
    {
        Route::prefix('lumen')->group(static function (): void {
            Route::prefix('scripts')->group(static function (): void {
                Route::get('{name}', LumenScriptsController::class)->name('lumen.scripts.get');
            });
        });
    }
}

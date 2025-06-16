<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support\Assets;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use InvalidArgumentException;
use Nuxtifyts\Lumen\Http\Controllers\LumenComponentScriptsController;

class Manager
{
    protected const string NONCE_SECRET = 'xen0l3g1c';

    public function boot(): void
    {
        $this->registerRoutes();
    }

    public function componentScript(string $name, ?string $route = null): string
    {
        return asset(
            route(
                $route ??= 'lumen.scripts.components',
                [
                    'name' => Str::endsWith('.js', $name) ? $name : $name . '.js',
                ]
            )
        );
    }

    public function generateNonce(int $length = 10): string
    {
        if ($length < 1) {
            throw new InvalidArgumentException('Nonce length must be greater than 0.');
        }

        $salt = Str::random($length);
        $now = (string) now()->timestamp;
        $secret = self::NONCE_SECRET;

        return Hash::make($salt . $now . $secret);
    }

    protected function registerRoutes(): void
    {
        Route::prefix('lumen')->group(static function (): void {
            Route::prefix('scripts')->group(static function (): void {
                Route::get('components/{name}', LumenComponentScriptsController::class)->name('lumen.scripts.components');
            });
        });
    }
}

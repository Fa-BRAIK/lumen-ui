<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class LumenServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('lumen-ui')
            ->hasConfigFile()
            ->hasViews()
            ->hasMigration('create_lumen_ui_table');
    }
}

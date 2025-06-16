<?php

namespace Nuxtifyts\Lumen;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use Nuxtifyts\Lumen\Commands\LumenCommand;

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
            ->hasMigration('create_lumen_ui_table')
            ->hasCommand(LumenCommand::class);
    }
}

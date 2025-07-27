<?php

declare(strict_types=1);

namespace Lumen;

use Lumen\Support\Concerns\HasLumenSupport;
use Lumen\TwMerge\TwMergeServiceProvider;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class LumenServiceProvider extends PackageServiceProvider
{
    use HasLumenSupport;

    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('lumen-ui')
            ->hasConfigFile('lumen')
            ->hasCommand(InstallLumenComponentCommand::class)
            ->hasViews('lumen');
    }

    public function registeringPackage(): void
    {
        $this
            ->registerDependencies()
            ->registerAliases()
            ->registerSingletons();
    }

    public function bootingPackage(): void
    {
        $this
            ->bootBladeDirectives()
            ->bootBladeComponents()
            ->bootLumenAssets();
    }

    protected function registerDependencies(): static
    {
        $this->app->register(TwMergeServiceProvider::class);

        return $this;
    }
}

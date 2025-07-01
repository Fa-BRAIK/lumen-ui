<?php

declare(strict_types=1);

namespace Lumen;

use Lumen\Support\Concerns\HasLumenSupport;
use Override;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use TailwindMerge\Laravel\TailwindMergeServiceProvider;

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
            ->hasViews('lumen');
    }

    /**
     * @phpstan-return static
     */
    #[Override]
    public function register()
    {
        parent::register();

        return $this
            ->registerDependencies()
            ->registerAliases()
            ->registerSingletons();
    }

    /**
     * @phpstan-return static
     */
    #[Override]
    public function boot()
    {
        return parent::boot()
            ->bootBladeDirectives()
            ->bootBladeComponents()
            ->bootLumenAssets();
    }

    protected function registerDependencies(): static
    {
        $this->app->register(TailwindMergeServiceProvider::class);

        return $this;
    }
}

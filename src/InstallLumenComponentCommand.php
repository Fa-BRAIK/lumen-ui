<?php

declare(strict_types=1);

namespace Lumen;

use Closure;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;

use function Laravel\Prompts\search;

use Lumen\Support\Blade\Components\Manifest;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand('lumen:install-component', 'Install a lumen component')]
final class InstallLumenComponentCommand extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lumen:install-component
                            {component : The name of the component to install}
                            {--with-dependencies : Install the component with its dependencies (Excluding assets)}
                            {--force : Force the installation of the component (overwriting existing files)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Installs a Lumen component into the application.';

    /**
     * Execute the console command.
     *
     * @throws Exception
     */
    public function handle(): int
    {
        $component = $this->resolveComponent();

        $canInstall = $this->canInstallComponent($component);

        if (true !== $canInstall && ! $this->option('force')) {
            $this->warn(
                match ($canInstall) {
                    'component_already_exists' => 'The component is already installed.',
                    'component_assets_cannot_be_copied' => 'The component has assets that cannot be copied.',
                    'component_dependencies_not_installed' => 'The component has dependencies that can not installed.',
                    default => 'An unknown error occurred while checking the component installation.'
                }
            );

            $this->error('Installation aborted. use --force to override existing files.');

            return Command::FAILURE;
        }

        $this->comment(sprintf('Installing component "%s"...', $component->name));

        $this->installComponent($component);

        return Command::SUCCESS;
    }

    /**
     * @throws Exception
     */
    public function copyDependencies(Manifest $component, bool $usingForce = false): void
    {
        $this->comment('Copying dependencies...');

        foreach ($component->dependencies() as $dependencyComponent) {
            $this->comment(sprintf(
                'Installing dependency "%s"...',
                $dependencyComponent->name
            ));

            $result = $this->call(
                "lumen:install-component {$dependencyComponent->name}",
                [
                    '--with-dependencies' => true,
                    '--force' => $usingForce,
                ]
            );

            if (Command::SUCCESS !== $result) {
                throw new Exception(sprintf(
                    'Failed to install dependency "%s".',
                    $dependencyComponent->name
                ));
            }
        }
    }

    protected function resolveComponent(): Manifest
    {
        $componentName = $this->argument('component');

        if ( ! array_key_exists($componentName, Manifest::COMPONENTS)) {
            throw new InvalidArgumentException(sprintf(
                'Component "%s" does not exist',
                $componentName
            ));
        }

        return new Manifest($componentName);
    }

    /**
     * @returns true if the component can be installed.
     * @returns 'component_already_exists' if the component's Blade file already exists.
     * @returns 'component_assets_cannot_be_copied' if the component has assets, and they cannot be copied.
     * @returns 'component_dependencies_not_installed' if the component has dependencies that are not installed.
     */
    protected function canInstallComponent(Manifest $component): string|true
    {
        $bladePath = config('lumen.installation.paths.blade');

        if (Storage::directoryExists($bladePath . DIRECTORY_SEPARATOR . $component->name)) {
            return 'component_already_exists';
        }

        if ($component->hasAssets()) {
            $assets = [
                config('lumen.installation.paths.js') => $component->jsAssets(),
                config('lumen.installation.paths.css') => $component->cssAssets(),
            ];

            foreach ($assets as $path => $files) {
                foreach ($files as $file) {
                    if (Storage::exists($path . DIRECTORY_SEPARATOR . $file)) {
                        return 'component_assets_cannot_be_copied';
                    }
                }
            }
        }

        if (($dependencies = $component->dependencies()) && ! $this->option('with-dependencies')) {
            foreach ($dependencies as $dependencyComponent) {
                if (true !== $this->canInstallComponent($dependencyComponent)) {
                    return 'component_dependencies_not_installed';
                }
            }
        }

        return true;
    }

    /**
     * @throws Exception
     */
    protected function installComponent(Manifest $component): void
    {
        $usingForce = $this->option('force');

        $this->copyBladeFiles($component, $usingForce);
        $this->copyAssets($component, $usingForce);
        $this->copyDependencies($component, $usingForce);
    }

    /**
     * @throws Exception
     */
    protected function copyBladeFiles(Manifest $component, bool $usingForce = false): void
    {
        $this->comment('Copying Blade files...');
        $distPath = $component->bladeDistPath();

        if ( ! Storage::directoryExists($distPath)) {
            Storage::makeDirectory($distPath);
        } elseif ($usingForce) {
            Storage::deleteDirectory($distPath);
            Storage::makeDirectory($distPath);
        } else {
            throw new Exception('blade_component_directory_already_exists');
        }

        Storage::copy($component->bladeStubPath(), $distPath);
    }

    /**
     * @throws Exception
     */
    protected function copyAssets(Manifest $component, bool $usingForce = false): void
    {
        $this->comment('Copying assets...');
        $jsDistPath = $component->jsDistPath();
        $cssDistPath = $component->cssDistPath();

        if ( ! Storage::directoryExists($jsDistPath)) {
            Storage::makeDirectory($jsDistPath);
        }

        if ( ! Storage::directoryExists($cssDistPath)) {
            Storage::makeDirectory($cssDistPath);
        }

        foreach ($component->jsAssets() as $jsFile) {
            $fileDistPath = "{$jsDistPath}/{$jsFile}.js";

            if (Storage::exists($fileDistPath) && ! $usingForce) {
                throw new Exception("JavaScript asset '{$jsFile}' already exists.");
            }

            Storage::copy($component->jsResourcesPath() . $jsFile . '.js', $fileDistPath);
        }

        foreach ($component->cssAssets() as $cssFile) {
            $fileDistPath = "{$cssDistPath}/{$cssFile}.css";

            if (Storage::exists($fileDistPath) && ! $usingForce) {
                throw new Exception("CSS asset '{$cssFile}' already exists.");
            }

            Storage::copy($component->cssResourcesPath() . $cssFile . '.css', $fileDistPath);
        }
    }

    /**
     * Prompt for missing input arguments using the returned questions.
     *
     * @return array<string, string|Closure(string):int|string>
     */
    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'component' => fn () => search(
                label: 'Select a component to install',
                options: fn (string $value) => collect(Manifest::COMPONENTS)
                    ->when(
                        Str::length($value) > 0,
                        static fn (Collection $components) => $components->filter(fn (string $name, string $key) => Str::contains($name, $value, ignoreCase: true)
                            || Str::contains($value, $key, ignoreCase: true))
                            ->take(5)
                    )
                    ->all(),
                scroll: 15,
            ),
        ];
    }
}

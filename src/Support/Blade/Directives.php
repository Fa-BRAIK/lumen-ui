<?php

declare(strict_types=1);

namespace Lumen\Support\Blade;

use Illuminate\Support\Facades\Blade;

class Directives
{
    /**
     * @desc Register Lumen/ui Blade Directives.
     */
    public function boot(): void
    {
        Blade::directive('lumenScripts', static function (): string {
            $stackName = config('lumen.blade.stacks.scripts');
            $compiledStack = Blade::compileString("@stack('{$stackName}')");
            $compiledLivewireScripts = Blade::compileString('@livewireScripts');
            
            $injectComponents = config('lumen.blade.components.autoload.enabled', false)
                ? '<?= app("lumen.assets")->injectLumenComponents() ?>'
                : '';

            return <<<PHP
                {$compiledStack}
                {$injectComponents}
                {$compiledLivewireScripts}
                <?= app('lumen.assets')->injectMainScript() ?>
            PHP;
        });

        Blade::directive('pushLumenScripts', static function (): string {
            $stackName = config('lumen.blade.stacks.scripts');

            return Blade::compileString("@push('{$stackName}')");
        });

        Blade::directive('endPushLumenScripts', static fn (): string => Blade::compileString('@endPush()'));

        Blade::directive('pushLumenScriptsOnce', static function (): string {
            $stackName = config('lumen.blade.stacks.scripts');

            return Blade::compileString("@pushOnce('{$stackName}')");
        });

        Blade::directive('endPushLumenScriptsOnce', static fn (): string => Blade::compileString('@endPushOnce()'));

        Blade::directive('lumenStyles', static function (): string {
            $compiledLivewireStyles = Blade::compileString('@livewireStyles');

            $stackName = config('lumen.blade.stacks.styles');
            $compiledStack = Blade::compileString("@stack('{$stackName}')");

            return <<<PHP
                {$compiledLivewireStyles}
                {$compiledStack}
            PHP;
        });

        Blade::directive('pushLumenStyles', static function (): string {
            $stackName = config('lumen.blade.stacks.styles');

            return Blade::compileString("@push('{$stackName}')");
        });

        Blade::directive('endPushLumenStyles', static fn (): string => Blade::compileString('@endPush()'));

        Blade::directive('pushLumenStylesOnce', static function (): string {
            $stackName = config('lumen.blade.stacks.styles');

            return Blade::compileString("@pushOnce('{$stackName}')");
        });

        Blade::directive('endPushLumenStylesOnce', static fn (): string => Blade::compileString('@endPushOnce()'));
    }
}

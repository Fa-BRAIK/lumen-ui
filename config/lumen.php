<?php

declare(strict_types=1);

return [
    'blade' => [
        /**
         * The stack names that are used by lumen directives:
         *
         * - @lumenStyles
         * - @lumenScripts
         * - @pushLumenStyles
         * - @pushLumenStylesOnce
         * - @pushLumenScripts
         * - @pushLumenScriptsOnce
         */
        'stacks' => [
            'scripts' => 'lumen::scripts',
            'styles' => 'lumen::styles',
        ],

        'components' => [
            'autoload' => [
                /**
                 * Whether to enable the autoloading of components.
                 * By doing this, components' assets will be automatically loaded as well.
                 *
                 * In order to install components, autoload MUST be disabled.
                 */
                'enabled' => true,

                /**
                 * The namespace under which the components are registered.
                 *
                 * e.g. `x-lumen::button
                 */
                'namespace' => 'lumen',
            ],
        ],
    ],

    /**
     * Paths where the component files will be installed.
     * This is used by the `lumen:install-component` command.
     */
    'installation' => [
        'paths' => [
            'js' => resource_path('js/components'),
            'css' => resource_path('css/components'),
            'blade' => resource_path('views/components'),
        ],
    ],
];

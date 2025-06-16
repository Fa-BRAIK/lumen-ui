<?php

declare(strict_types=1);

// config for Nuxtifyts/Lumen
return [
    'blade' => [
        'stacks' => [
            'scripts' => 'lumen::scripts',
            'styles' => 'lumen::styles',
        ],

        'components' => [
            // TODO: Update this to be `false` when the library is more mature.
            'autoload' => [
                'enabled' => true,
                'namespace' => 'lumen',
            ],
        ],
    ],
];

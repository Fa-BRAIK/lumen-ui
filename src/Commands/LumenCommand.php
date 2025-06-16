<?php

namespace Nuxtifyts\Lumen\Commands;

use Illuminate\Console\Command;

class LumenCommand extends Command
{
    public $signature = 'lumen-ui';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}

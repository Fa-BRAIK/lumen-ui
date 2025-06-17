<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support\Blade\Components\Exceptions;

use Exception;

class InvalidComponentException extends Exception
{
    protected const int INVALID_PRIMITIVE_TAG = 10000;

    public static function invalidPrimitiveTag(): self
    {
        return new self(
            message: 'Invalid primitive tag provided.',
            code: self::INVALID_PRIMITIVE_TAG
        );
    }
}

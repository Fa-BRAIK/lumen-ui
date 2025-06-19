<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support\Blade\Components\Exceptions;

use Exception;

class InvalidComponentException extends Exception
{
    protected const int INVALID_PRIMITIVE_TAG = 10000;
    protected const int INVALID_TOGGLE_GROUP_TYPE = 20000;

    public static function invalidPrimitiveTag(): self
    {
        return new self(
            message: 'Invalid primitive tag provided.',
            code: self::INVALID_PRIMITIVE_TAG
        );
    }

    public static function invalidToggleGroupType(): self
    {
        return new self(
            message: 'Invalid toggle group type provided.',
            code: self::INVALID_TOGGLE_GROUP_TYPE
        );
    }
}

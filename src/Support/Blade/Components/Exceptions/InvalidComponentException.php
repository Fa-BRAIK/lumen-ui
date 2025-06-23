<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support\Blade\Components\Exceptions;

use RuntimeException;

class InvalidComponentException extends RuntimeException
{
    protected const int INVALID_PRIMITIVE_TAG = 10000;
    protected const int INVALID_TOGGLE_GROUP_TYPE = 20000;
    protected const int INVALID_SLIDER_STEP = 30000;
    protected const int INVALID_TOOLTIP_DELAY_DURATION = 40000;

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

    public static function invalidSliderStep(): self
    {
        return new self(
            message: 'Invalid slider step provided.',
            code: self::INVALID_SLIDER_STEP
        );
    }

    public static function invalidTooltipDelayDuration(): self
    {
        return new self(
            message: 'Invalid tooltip delay duration provided.',
            code: self::INVALID_TOOLTIP_DELAY_DURATION
        );
    }
}

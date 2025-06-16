<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Stringable;

class ClassBuilder implements Stringable
{
    protected function __construct(
        /** @var list<string> */
        protected array $classes,
    ) {}

    public function __toString(): string
    {
        return Str::trim(
            collect($this->classes)
                ->map(static fn (string $classes): array => explode(' ', $classes))
                ->collapse()
                ->unique()
                ->join(' '),
        );
    }

    /**
     * @param  string|array<array-key, mixed>  $classes
     */
    public static function make(string|array $classes = []): static
    {
        return new static([Arr::toCssClasses(is_array($classes) ? $classes : [$classes])]);
    }

    /**
     * @param  string|array<string, bool>|Collection<string, bool>|Collection<int, string>  $classes
     */
    public function add(string|array|Collection $classes): static
    {
        $addedClasses = is_string($classes)
            ? $classes
            : Arr::toCssClasses(is_array($classes) ? $classes : $classes->toArray());

        $this->classes[] = $addedClasses;

        return $this;
    }
}

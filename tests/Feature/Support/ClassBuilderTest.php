<?php

declare(strict_types=1);

use Lumen\Support\ClassBuilder;

covers(ClassBuilder::class);

it('is capable of generating empty string', function (): void {
    expect((string) ClassBuilder::make())->toBe('');
});

it('is capable of adding classes', function (array $classes, string $expected): void {
    $classBuilder = ClassBuilder::make();

    foreach ($classes as $class) {
        $classBuilder->add($class);
    }

    expect(
        (string) collect($classes)
            ->reduce(
                static fn (ClassBuilder $builder, string|array $class) => $builder->add($class),
                ClassBuilder::make()
            )
    )->toBe($expected);
})->with([
    'One call' => [
        'classes' => ['text-red-500'],
        'expected' => 'text-red-500',
    ],
    'Two calls' => [
        'classes' => ['text-red-600', ['text-xl font-bold']],
        'expected' => 'text-red-600 text-xl font-bold',
    ],
    'Three calls, one repeated should not be when generated' => [
        'classes' => ['text-red-600', 'font-bold', ['text-red-600']],
        'expected' => 'text-red-600 font-bold',
    ],
]);

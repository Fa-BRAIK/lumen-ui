<?php

declare(strict_types=1);

namespace Lumen\Support\Blade\Components;

use Illuminate\Support\Arr;

final readonly class Manifest
{
    /**
     * Associated by component name from stubs directory.
     *
     * @var array<string, string>
     */
    public const array COMPONENTS = [
        'accordion' => 'Accordion',
        'alert-dialog' => 'Alert Dialog',
        'alert' => 'Alert',
        'avatar' => 'Avatar',
        'badge' => 'Badge',
        'breadcrumb' => 'Breadcrumb',
        'button' => 'Button',
        'calendar' => 'Calendar',
        'card' => 'Card',
        'carousel' => 'Carousel',
        'checkbox' => 'Checkbox',
        'collapsible' => 'Collapsible',
        'date-picker' => 'Date Picker',
        'dialog' => 'Dialog',
        'drawer' => 'Drawer',
        'dropdown-menu' => 'Dropdown Menu',
        'hover-card' => 'Hover Card',
        'input' => 'Input',
        'label' => 'Label',
        'pagination' => 'Pagination',
        'popover' => 'Popover',
        'progress' => 'Progress',
        'radio-group' => 'Radio Group',
        'select' => 'Select',
        'separator' => 'Separator',
        'skeleton' => 'Skeleton',
        'slider' => 'Slider',
        'sonner' => 'Sonner',
        'switch' => 'Switch',
        'table' => 'Table',
        'tabs' => 'Tabs',
        'textarea' => 'Textarea',
        'toggle-group' => 'Toggle Group',
        'toggle' => 'Toggle',
        'tooltip' => 'Tooltip',
    ];

    /**
     * Dependencies for the components.
     *
     * @var array<string, array<string>>
     */
    private const array DEPENDENCIES = [
        'date-picker' => ['button', 'input', 'calendar'],
    ];

    /**
     * Assets for the components.
     *
     * @var array<string, array{
     *     js?: string|array<string>,
     *     css?: string|array<string>,
     * }>
     */
    private const array COMPONENTS_ASSETS = [
        'accordion' => ['js' => 'accordion.js'],
        'alert-dialog' => ['js' => 'alert-dialog.js'],
        'avatar' => ['js' => 'avatar.js'],
        'calendar' => ['js' => 'calendar.js'],
        'carousel' => ['js' => 'carousel.js'],
        'checkbox' => ['js' => 'checkbox.js'],
        'collapsible' => ['js' => 'collapsible.js'],
        'dialog' => ['js' => 'dialog.js'],
        'drawer' => ['js' => 'drawer.js'],
        'dropdown-menu' => ['js' => 'dropdown-menu.js'],
        'hover-card' => ['js' => 'hover-card.js'],
        'popover' => ['js' => 'popover.js'],
        'progress' => ['js' => 'progress.js'],
        'radio-group' => ['js' => 'radio-group.js'],
        'select' => ['js' => 'select.js'],
        'slider' => ['js' => 'slider.js'],
        'switch' => ['js' => 'switch.js'],
        'tabs' => ['js' => 'tabs.js'],
        'toggle' => ['js' => 'toggle.js'],
        'toggle-group' => ['js' => 'toggle-group.js'],
        'tooltip' => ['js' => 'tooltip.js'],
    ];

    public function __construct(public string $name) {}

    public function hasAssets(): bool
    {
        return (bool) (self::COMPONENTS_ASSETS[$this->name] ?? null);
    }

    /**
     * @return array<Manifest>
     */
    public function dependencies(): array
    {
        return Arr::map(self::DEPENDENCIES[$this->name] ?? [], self::create(...));
    }

    /**
     * @return array<string>
     */
    public function jsAssets(): array
    {
        return Arr::wrap(self::COMPONENTS_ASSETS[$this->name]['js'] ?? []);
    }

    /**
     * @return array<string>
     */
    public function cssAssets(): array
    {
        return Arr::wrap(self::COMPONENTS_ASSETS[$this->name]['css'] ?? []); // @phpstan-ignore-line
    }

    public function bladeStubPath(): string
    {
        return __DIR__ . '/../../../../stubs/resources/views/components/' . $this->name;
    }

    public function bladeDistPath(): string
    {
        return config('lumen.installation.paths.blade') . "/{$this->name}";
    }

    public function jsResourcesPath(): string
    {
        return __DIR__ . '/../../../../resources/js/components/';
    }

    public function jsDistPath(): string
    {
        return config('lumen.installation.paths.js');
    }

    public function cssResourcesPath(): string
    {
        return __DIR__ . '/../../../../resources/css/components/';
    }

    public function cssDistPath(): string
    {
        return config('lumen.installation.paths.css');
    }

    private static function create(string $name): self
    {
        return new self($name);
    }
}

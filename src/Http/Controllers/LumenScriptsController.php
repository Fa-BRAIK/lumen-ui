<?php

declare(strict_types=1);

namespace Lumen\Http\Controllers;

use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

readonly class LumenScriptsController extends Controller
{
    protected const string CACHE_CONTROL = 'public, max-age=31536000';

    protected const string EXPIRES = '+1 year';

    public function __invoke(Request $request, string $name): Response
    {
        try {
            $id = $request->query('id');
            $manifestPath = __DIR__ . '/../../../dist/.vite/manifest.json';
            $manifest = json_decode(File::get($manifestPath), true);

            $entryPoint = Arr::first(
                $manifest,
                static fn (array $entryData) => Arr::string($entryData, 'name') === $name
                && Arr::string($entryData, 'file') === "{$name}.{$id}.js"
            );

            $filePath = __DIR__ . '/../../../dist/' . Arr::string($entryPoint, 'file');

            return response(
                content: File::get($filePath),
                headers: [
                    'Content-Type' => 'application/javascript;',
                    'Expires' => sprintf('%s GMT', gmdate('D, d M Y H:i:s', strtotime(static::EXPIRES))),
                    'Cache-Control' => static::CACHE_CONTROL,
                    'Last-Modified' => sprintf('%s GMT', gmdate('D, d M Y H:i:s', filemtime($filePath))),
                ]
            );
        } catch (FileNotFoundException) {
            abort(Response::HTTP_NOT_FOUND);
        }
    }
}

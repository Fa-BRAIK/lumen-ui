<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Http\Controllers;

use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

readonly class LumenComponentScriptsController extends Controller
{
    protected const string CACHE_CONTROL = 'public, max-age=31536000';

    protected const string EXPIRES = '+1 year';

    public function __invoke(string $name): Response
    {
        try {
            $filePath = app()->isLocal() && File::exists($fileDevPath = __DIR__ . '/../../../dist/js/components/dev/' . $name)
                ? $fileDevPath
                : __DIR__ . '/../../../dist/js/components/' . $name;

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
            abort(HttpResponse::HTTP_NOT_FOUND);
        }
    }
}

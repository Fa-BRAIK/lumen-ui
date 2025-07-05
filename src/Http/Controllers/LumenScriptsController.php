<?php

declare(strict_types=1);

namespace Lumen\Http\Controllers;

use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response;

readonly class LumenScriptsController extends Controller
{
    protected const string CACHE_CONTROL = 'public, max-age=31536000';

    protected const string NONCE_SECRET = 'xen0l3g1c';

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
            abort(HttpResponse::HTTP_NOT_FOUND);
        }
    }

    protected function generateNonce(int $length = 10): string
    {
        if ($length < 1) {
            throw new InvalidArgumentException('Nonce length must be greater than 0.');
        }

        $salt = Str::random($length);
        $now = (string) now()->timestamp;
        $secret = self::NONCE_SECRET;

        return Hash::make($salt . $now . $secret);
    }
}

<?php

declare(strict_types=1);

use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

// Ignore this file, because it is Laravel Framework helper functions.
// @codeCoverageIgnoreStart

if (! function_exists('public_path')) {
    /**
     * Get the path to the public folder.
     *
     * Extracted from helpers of the Laravel Framework.
     *
     * @param string $path
     *
     * @return string
     *
     * @see https://github.com/laravel/framework/blob/5.8/src/Illuminate/Foundation/helpers.php
     */
    function public_path($path = '')
    {
        return rtrim(app()->basePath('public/'.$path), DIRECTORY_SEPARATOR);
    }
}

if (! function_exists('mix')) {
    /**
     * Get the path to a versioned Mix file.
     *
     * Extracted from helpers of the Laravel Framework.
     *
     * @param string $path
     * @param string $manifestDirectory
     *
     * @return HtmlString|string
     *
     * @throws Exception
     *
     * @see https://github.com/laravel/framework/blob/5.8/src/Illuminate/Foundation/Mix.php
     */
    function mix($path, $manifestDirectory = '')
    {
        static $manifests = [];

        if (! Str::startsWith($path, '/')) {
            $path = "/{$path}";
        }

        if ($manifestDirectory && ! Str::startsWith($manifestDirectory, '/')) {
            $manifestDirectory = "/{$manifestDirectory}";
        }

        if (file_exists(public_path($manifestDirectory.'/hot'))) {
            $url = rtrim(file_get_contents(public_path($manifestDirectory.'/hot')));

            if (Str::startsWith($url, ['http://', 'https://'])) {
                return new HtmlString(Str::after($url, ':').$path);
            }

            return new HtmlString("//localhost:8080{$path}");
        }

        $manifestPath = public_path($manifestDirectory.'/mix-manifest.json');

        if (! isset($manifests[$manifestPath])) {
            if (! file_exists($manifestPath)) {
                throw new Exception('The Mix manifest does not exist.');
            }

            $manifests[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
        }

        $manifest = $manifests[$manifestPath];

        if (! isset($manifest[$path])) {
            $exception = new Exception("Unable to locate Mix file: {$path}.");

            if (! app('config')->get('app.debug')) {
                report($exception);

                return $path;
            } else {
                throw $exception;
            }
        }

        return new HtmlString(app('config')->get('app.mix_url').$manifestDirectory.$manifest[$path]);
    }
}

// @codeCoverageIgnoreEnd

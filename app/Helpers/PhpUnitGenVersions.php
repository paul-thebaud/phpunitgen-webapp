<?php

namespace PhpUnitGen\WebApp\Helpers;

use PackageVersions\Versions;
use PhpUnitGen\Core\Helpers\Str;

/**
 * Class PhpUnitGenVersions.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class PhpUnitGenVersions
{
    /**
     * Retrieve the Web application version.
     *
     * @return string
     */
    public static function getWebVersion(): string
    {
        return static::getPackageVersion(Versions::rootPackageName());
    }

    /**
     * Retrieve the core package version.
     *
     * @return string
     */
    public static function getCoreVersion(): string
    {
        return static::getPackageVersion('phpunitgen/core');
    }

    /**
     * Retrieve the PhpUnitGen Core version.
     *
     * @param string $packageName
     *
     * @return string
     */
    protected static function getPackageVersion(string $packageName): string
    {
        $version = Versions::getVersion($packageName);

        return Str::beforeLast('@', $version);
    }
}

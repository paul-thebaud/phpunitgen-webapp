<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Routing\Controller as BaseController;
use PackageVersions\Versions;
use PhpUnitGen\Core\Helpers\Str;

/**
 * Class VersionController.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class VersionController extends BaseController
{
    /**
     * Retrieve the information about API version.
     *
     * @return JsonResponse
     */
    public function __invoke(): JsonResponse
    {
        return new JsonResponse([
            'core_version' => $this->getCoreVersion(),
            'api_version'  => $this->getApiVersion(),
        ], JsonResponse::HTTP_OK);
    }

    /**
     * Retrieve the PhpUnitGen Core version.
     *
     * @return string
     */
    protected function getCoreVersion(): string
    {
        $version = Versions::getVersion('phpunitgen/core');

        return Str::beforeLast('@', $version);
    }

    /**
     * Retrieve the PhpUnitGen Core version.
     *
     * @return string
     */
    protected function getApiVersion(): string
    {
        return 'v1';
    }
}

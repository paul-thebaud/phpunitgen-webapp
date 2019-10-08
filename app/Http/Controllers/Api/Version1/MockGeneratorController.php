<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Routing\Controller as BaseController;
use PhpUnitGen\WebApp\Http\Controllers\Resources\MockGeneratorResource;

/**
 * Class MockGeneratorController.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class MockGeneratorController extends BaseController
{
    /**
     * Retrieve the list of available test generators.
     *
     * @param MockGeneratorResource $mockGeneratorResource
     *
     * @return JsonResponse
     */
    public function __invoke(MockGeneratorResource $mockGeneratorResource): JsonResponse
    {
        return new JsonResponse(
            $mockGeneratorResource->all(),
            JsonResponse::HTTP_OK
        );
    }
}

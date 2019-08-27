<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use PhpUnitGen\WebApp\Http\Controllers\Resources\TestGeneratorResource;

/**
 * Class TestGeneratorController.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class TestGeneratorController extends BaseController
{
    /**
     * Retrieve the list of available test generators.
     *
     * @param Request               $request
     * @param TestGeneratorResource $testGeneratorResource
     *
     * @return JsonResponse
     */
    public function __invoke(Request $request, TestGeneratorResource $testGeneratorResource): JsonResponse
    {
        return new JsonResponse(
            $testGeneratorResource->all(),
            JsonResponse::HTTP_OK
        );
    }
}

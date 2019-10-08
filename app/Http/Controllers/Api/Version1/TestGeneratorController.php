<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use Illuminate\Http\JsonResponse;
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
     * @param TestGeneratorResource $testGeneratorResource
     *
     * @return JsonResponse
     */
    public function index(TestGeneratorResource $testGeneratorResource): JsonResponse
    {
        return new JsonResponse(
            $testGeneratorResource->all(),
            JsonResponse::HTTP_OK
        );
    }

    /**
     * Retrieve one test generator from its ID.
     *
     * @param TestGeneratorResource $testGeneratorResource
     * @param string                $id
     *
     * @return JsonResponse
     */
    public function show(TestGeneratorResource $testGeneratorResource, string $id): JsonResponse
    {
        return new JsonResponse(
            $testGeneratorResource->find($id),
            JsonResponse::HTTP_OK
        );
    }
}

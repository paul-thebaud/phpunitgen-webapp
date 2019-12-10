<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Routing\Controller as BaseController;
use PhpUnitGen\WebApp\Http\Resources\TestGeneratorResource;

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
     * @var TestGeneratorResource
     */
    protected TestGeneratorResource $testGeneratorResource;

    /**
     * TestGeneratorController constructor.
     *
     * @param TestGeneratorResource $testGeneratorResource
     */
    public function __construct(TestGeneratorResource $testGeneratorResource)
    {
        $this->testGeneratorResource = $testGeneratorResource;
    }

    /**
     * Retrieve the list of available test generators.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return new JsonResponse(
            $this->testGeneratorResource->all(),
            JsonResponse::HTTP_OK
        );
    }

    /**
     * Retrieve one test generator from its ID.
     *
     * @param string $id
     *
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        return new JsonResponse(
            $this->testGeneratorResource->find($id),
            JsonResponse::HTTP_OK
        );
    }
}

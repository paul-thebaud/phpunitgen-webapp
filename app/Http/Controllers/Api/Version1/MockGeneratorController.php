<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Routing\Controller as BaseController;
use PhpUnitGen\WebApp\Http\Resources\MockGeneratorResource;

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
     * @var MockGeneratorResource
     */
    protected MockGeneratorResource $mockGeneratorResource;

    /**
     * MockGeneratorController constructor.
     *
     * @param MockGeneratorResource $mockGeneratorResource
     */
    public function __construct(MockGeneratorResource $mockGeneratorResource)
    {
        $this->mockGeneratorResource = $mockGeneratorResource;
    }

    /**
     * Retrieve the list of available mock generators.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return new JsonResponse(
            $this->mockGeneratorResource->all(),
            JsonResponse::HTTP_OK
        );
    }

    /**
     * Retrieve one mock generator from its ID.
     *
     * @param string $id
     *
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        return new JsonResponse(
            $this->mockGeneratorResource->find($id),
            JsonResponse::HTTP_OK
        );
    }
}

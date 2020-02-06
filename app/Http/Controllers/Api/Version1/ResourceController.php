<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Routing\Controller as BaseController;
use PhpUnitGen\WebApp\Http\Resources\AbstractResource;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class ResourceController.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class ResourceController extends BaseController
{
    /**
     * @var AbstractResource
     */
    protected AbstractResource $resource;

    /**
     * Retrieve the list of available mock generators.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return new JsonResponse(
            $this->resource->all(),
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
        $record = $this->resource->find($id);
        if (! $record) {
            throw new NotFoundHttpException();
        }

        return new JsonResponse($record, JsonResponse::HTTP_OK);
    }
}

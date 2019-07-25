<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

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
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        return new JsonResponse('', JsonResponse::HTTP_NO_CONTENT);
    }
}

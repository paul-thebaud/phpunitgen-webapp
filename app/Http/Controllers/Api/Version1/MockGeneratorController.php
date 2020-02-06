<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use PhpUnitGen\WebApp\Http\Resources\MockGeneratorResource;

/**
 * Class MockGeneratorController.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class MockGeneratorController extends ResourceController
{
    /**
     * MockGeneratorController constructor.
     *
     * @param MockGeneratorResource $mockGeneratorResource
     */
    public function __construct(MockGeneratorResource $mockGeneratorResource)
    {
        $this->resource = $mockGeneratorResource;
    }
}

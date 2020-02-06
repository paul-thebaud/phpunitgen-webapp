<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use PhpUnitGen\WebApp\Http\Resources\TestGeneratorResource;

/**
 * Class TestGeneratorController.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class TestGeneratorController extends ResourceController
{
    /**
     * TestGeneratorController constructor.
     *
     * @param TestGeneratorResource $testGeneratorResource
     */
    public function __construct(TestGeneratorResource $testGeneratorResource)
    {
        $this->resource = $testGeneratorResource;
    }
}

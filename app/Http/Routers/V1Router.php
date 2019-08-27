<?php

namespace PhpUnitGen\WebApp\Http\Routers;

use Laravel\Lumen\Routing\Router;
use PhpUnitGen\WebApp\Http\Controllers\Api\Version1\MockGeneratorController;
use PhpUnitGen\WebApp\Http\Controllers\Api\Version1\TestController;
use PhpUnitGen\WebApp\Http\Controllers\Api\Version1\TestGeneratorController;
use PhpUnitGen\WebApp\Http\Controllers\Api\Version1\VersionController;

/**
 * Class V1Router.
 */
class V1Router
{
    /**
     * Declare the routes for V1 API.
     *
     * @param Router $router
     */
    public static function routes(Router $router): void
    {
        $router->get('/', VersionController::class);
        $router->get('/test-generators', TestGeneratorController::class);
        $router->get('/mock-generators', MockGeneratorController::class);
        $router->post('/tests', TestController::class);
    }
}

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
        $router->get('/test-generators', TestGeneratorController::class.'@index');
        $router->get('/test-generators/{id}', TestGeneratorController::class.'@show');
        $router->get('/mock-generators', MockGeneratorController::class.'@index');
        $router->get('/mock-generators/{id}', MockGeneratorController::class.'@show');
        $router->post('/tests', TestController::class);
    }
}

<?php

use Laravel\Lumen\Routing\Router;
use PhpUnitGen\WebApp\Http\Controllers\AppController;
use PhpUnitGen\WebApp\Http\Routers\V1Router;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/** @var Router $router */

$router->group(['prefix' => 'api'], function (Router $router) {
    V1Router::routes($router);
});

$router->group(['prefix' => 'api/v1'], function (Router $router) {
    V1Router::routes($router);
});

$router->get('{any:.*}', AppController::class);

<?php

use Laravel\Lumen\Routing\Router;
use PhpUnitGen\WebApp\Http\Controllers\Api\TestGeneratorController;
use PhpUnitGen\WebApp\Http\Controllers\HomeController;

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
    $router->get('/test-generators', TestGeneratorController::class);
    $router->post('/tests', TestGeneratorController::class);
});

$router->get('{any:.*}', HomeController::class);

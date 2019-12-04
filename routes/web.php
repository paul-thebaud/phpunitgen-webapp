<?php

use Laravel\Lumen\Routing\Router;
use PhpUnitGen\WebApp\Http\Controllers\Api\Version1\MockGeneratorController;
use PhpUnitGen\WebApp\Http\Controllers\Api\Version1\TestController;
use PhpUnitGen\WebApp\Http\Controllers\Api\Version1\TestGeneratorController;
use PhpUnitGen\WebApp\Http\Controllers\Api\Version1\VersionController;
use PhpUnitGen\WebApp\Http\Controllers\AppController;
use PhpUnitGen\WebApp\Http\Controllers\DocsController;

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

/* @var Router $router */

$router->group(['prefix' => 'api/v1'], function (Router $router) {
    $router->get('/', VersionController::class);
    $router->get('/test-generators', TestGeneratorController::class.'@index');
    $router->get('/test-generators/{id}', TestGeneratorController::class.'@show');
    $router->get('/mock-generators', MockGeneratorController::class.'@index');
    $router->get('/mock-generators/{id}', MockGeneratorController::class.'@show');
    $router->post('/tests', TestController::class);
});

$router->get('/docs', DocsController::class);

$router->get('{any:.*}', AppController::class);

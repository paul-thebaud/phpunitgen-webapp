<?php

declare(strict_types=1);

use Illuminate\Contracts\Console\Kernel as ConsoleKernelContract;
use Illuminate\Contracts\Debug\ExceptionHandler as ExceptionHandlerContract;
use Laravel\Lumen\Application;
use Laravel\Lumen\Bootstrap\LoadEnvironmentVariables;
use Laravel\Lumen\Routing\Router;
use PhpUnitGen\WebApp\Console\Kernel as ConsoleKernel;
use PhpUnitGen\WebApp\Exceptions\Handler;
use PhpUnitGen\WebApp\Http\Middleware\DefineLanguage;
use PhpUnitGen\WebApp\Http\Middleware\ThrottleRequests;
use PhpUnitGen\WebApp\Providers\AppServiceProvider;

require_once __DIR__.'/../vendor/autoload.php';

(new LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here we will load the environment and create the application instance
| that serves as the central piece of this framework. We'll use this
| application as an "IoC" container and router for this framework.
|
*/

$app = new Application(
    dirname(__DIR__)
);

/*
|--------------------------------------------------------------------------
| Register Container Bindings
|--------------------------------------------------------------------------
|
| Now we will register a few bindings in the service container. We will
| register the exception handler and the console kernel. You may add
| your own bindings here if you like or you can make another file.
|
*/

$app->singleton(
    ExceptionHandlerContract::class,
    Handler::class
);

$app->singleton(
    ConsoleKernelContract::class,
    ConsoleKernel::class
);

/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Next, we will register the middleware with the application. These can
| be global middleware that run before and after each request into a
| route or middleware that'll be assigned to some specific routes.
|
*/

$app->middleware([
    DefineLanguage::class,
]);
$app->routeMiddleware([
    'throttle' => ThrottleRequests::class,
]);

/*
|--------------------------------------------------------------------------
| Register Service Providers
|--------------------------------------------------------------------------
|
| Here we will register all of the application's service providers which
| are used to bind services into the container. Service providers are
| totally optional, so you are not required to uncomment this line.
|
*/

$app->register(AppServiceProvider::class);

/*
|--------------------------------------------------------------------------
| Load The Application Routes
|--------------------------------------------------------------------------
|
| Next we will include the routes file so that they can all be added to
| the application. This will provide all of the URLs the application
| can respond to, as well as the controllers that may handle them.
|
*/

$app->router->group(['middleware' => 'throttle:60,1'], function (Router $router) {
    require __DIR__.'/../routes/web.php';
});

return $app;

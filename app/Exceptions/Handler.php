<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

/**
 * Class Handler.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class Handler extends ExceptionHandler
{
    /**
     * @var array A list of the exception types that should not be reported.
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * {@inheritdoc}
     */
    public function render($request, Throwable $exception)
    {
        $rendered = parent::render($request, $exception);

        if (! $request->expectsJson()) {
            return $rendered;
        }

        if (! $exception instanceof HttpException
            && ! $exception instanceof ValidationException
        ) {
            $message = 'Server error';
        } else {
            $message = $exception->getMessage();
        }

        $payload = compact('message');

        if ($exception instanceof ValidationException) {
            $payload['errors'] = $exception->errors();
        }

        return new JsonResponse($payload, $rendered->getStatusCode());
    }
}

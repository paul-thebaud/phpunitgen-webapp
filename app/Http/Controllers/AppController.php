<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers;

use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class AppController.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class AppController extends BaseController
{
    /**
     * The available frontend routes mapped with "any" endpoint.
     */
    protected const AVAILABLE_ROUTES = [
        '',
        'tool',
        'themes',
        'configuration',
        'legal',
        'unicorn',
        'cookies',
    ];

    /**
     * @var ViewFactory
     */
    protected ViewFactory $viewFactory;

    /**
     * HomeController constructor.
     *
     * @param ViewFactory $viewFactory
     */
    public function __construct(ViewFactory $viewFactory)
    {
        $this->viewFactory = $viewFactory;
    }

    /**
     * Get the home page.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function __invoke(Request $request): Response
    {
        $status = Response::HTTP_OK;

        // Only match frontend routes, to avoid Docsify thinking this is a MarkDown file.
        if (! in_array($request->route('any'), self::AVAILABLE_ROUTES)) {
            $status = Response::HTTP_NOT_FOUND;
        }

        return new Response($this->viewFactory->make('app'), $status);
    }
}

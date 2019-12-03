<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers;

use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class DocsController.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class DocsController extends BaseController
{
    /**
     * @var ViewFactory
     */
    protected $viewFactory;

    /**
     * DocsController constructor.
     *
     * @param ViewFactory $viewFactory
     */
    public function __construct(ViewFactory $viewFactory)
    {
        $this->viewFactory = $viewFactory;
    }

    /**
     * Get the docs page.
     *
     * @param Request $request
     *
     * @return View
     */
    public function __invoke(Request $request): View
    {
        return $this->viewFactory->make('docs');
    }
}

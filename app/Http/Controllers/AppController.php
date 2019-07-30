<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers;

use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Contracts\View\View;
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
     * @var ViewFactory
     */
    protected $viewFactory;

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
     * @return View
     */
    public function __invoke(): View
    {
        return $this->viewFactory->make('app');
    }
}

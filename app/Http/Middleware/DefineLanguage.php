<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Middleware;

use Closure;
use Illuminate\Contracts\Translation\Translator;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DefineLanguage.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class DefineLanguage
{
    /**
     * The available languages on application.
     */
    public const LANGUAGES = ['en', 'fr'];

    /**
     * @var Translator The translator we will update locale on.
     */
    protected $translator;

    /**
     * DefineLanguage constructor.
     *
     * @param Translator $translator
     */
    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     *
     * @return Response
     */
    public function handle($request, Closure $next)
    {
        $this->translator->setLocale($request->getPreferredLanguage(self::LANGUAGES));

        return $next($request);
    }
}

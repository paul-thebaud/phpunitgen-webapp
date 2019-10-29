<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Routing\Controller as BaseController;
use PhpUnitGen\Core\Contracts\Generators\MockGenerator;
use PhpUnitGen\Core\CoreApplication;
use PhpUnitGen\Core\Parsers\Sources\StringSource;
use PhpUnitGen\WebApp\Http\Resources\MockGeneratorResource;
use PhpUnitGen\WebApp\Http\Resources\TestGeneratorResource;
use Throwable;

/**
 * Class TestController.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class TestController extends BaseController
{
    /**
     * Generate a test using the given configuration.
     *
     * @param Request               $request
     * @param MockGeneratorResource $mockGeneratorResource
     * @param TestGeneratorResource $testGeneratorResource
     *
     * @return JsonResponse
     *
     * @throws ValidationException
     */
    public function __invoke(
        Request $request,
        MockGeneratorResource $mockGeneratorResource,
        TestGeneratorResource $testGeneratorResource
    ): JsonResponse {
        $validatedData = $this->validateData($request, $mockGeneratorResource, $testGeneratorResource);

        $config = $this->buildConfig($validatedData, $mockGeneratorResource, $testGeneratorResource);

        $executionTime = microtime(true);

        try {
            [$testName, $testCode] = $this->buildAndExecutePhpUnitGen(
                $config,
                Arr::get($validatedData, 'code')
            );
        } catch (Throwable $exception) {
            return new JsonResponse([
                'message'   => 'PhpUnitGen Core execution thrown an exception',
                'exception' => $this->exceptionToArray($exception),
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        return new JsonResponse([
            'name'          => $testName,
            'code'          => $testCode,
            'executionTime' => microtime(true) - $executionTime,
        ], JsonResponse::HTTP_CREATED);
    }

    /**
     * Validate and retrieve the data necessary to PhpUnitGen execution.
     *
     * @param Request               $request
     * @param MockGeneratorResource $mockGeneratorResource
     * @param TestGeneratorResource $testGeneratorResource
     *
     * @return array
     *
     * @throws ValidationException
     */
    protected function validateData(
        Request $request,
        MockGeneratorResource $mockGeneratorResource,
        TestGeneratorResource $testGeneratorResource
    ): array {
        return $this->validate($request, [
            'config'                     => 'required|array',
            'config.automaticGeneration' => 'nullable|boolean',
            'config.mockGenerator'       => 'required|in:'.$mockGeneratorResource->all()->pluck('id')->implode(','),
            'config.testGenerator'       => 'required|in:'.$testGeneratorResource->all()->pluck('id')->implode(','),
            'config.baseNamespace'       => 'nullable|string|max:255',
            'config.baseTestNamespace'   => 'nullable|string|max:255',
            'config.testCase'            => 'nullable|string|max:255',
            'config.excludedMethods'     => 'nullable|array',
            'config.excludedMethods.*'   => 'nullable|string|max:255',
            'config.mergedPhpDoc'        => 'nullable|array',
            'config.mergedPhpDoc.*'      => 'nullable|string|max:255',
            'config.phpDoc'              => 'nullable|array',
            'config.phpDoc.*'            => 'nullable|string|max:255',
            'config.options'             => 'nullable|array',
            'code'                       => 'required|string|max:10000',
        ]);
    }

    /**
     * Build the configuration array using the validated data.
     *
     * @param array                 $validatedData
     * @param MockGeneratorResource $mockGeneratorResource
     * @param TestGeneratorResource $testGeneratorResource
     *
     * @return array
     */
    protected function buildConfig(
        array $validatedData,
        MockGeneratorResource $mockGeneratorResource,
        TestGeneratorResource $testGeneratorResource
    ): array {
        $config = new Collection(Arr::get($validatedData, 'config'));

        $mockGenerator = $mockGeneratorResource->find($config->pull('mock_generator'))['class'];
        $testGenerator = $testGeneratorResource->find($config->pull('test_generator'))['class'];

        $implementations = call_user_func([$testGenerator, 'implementations']);
        $implementations[MockGenerator::class] = $mockGenerator;

        return $config->put('implementations', $implementations)
            ->filter()
            ->toArray();
    }

    /**
     * Build and execute the PhpUnitGen application for given configuration and code. Return
     * the test class name and code in an array.
     *
     * @param array  $config
     * @param string $code
     *
     * @return array
     */
    protected function buildAndExecutePhpUnitGen(array $config, string $code): array
    {
        $phpUnitGen = CoreApplication::make($config);

        $reflectionClass = $phpUnitGen->getCodeParser()->parse(new StringSource($code));
        $testClass = $phpUnitGen->getTestGenerator()->generate($reflectionClass);
        $renderer = $phpUnitGen->getRenderer();
        $renderer->visitTestClass($testClass);
        $rendered = $renderer->getRendered();

        return [$testClass->getShortName(), $rendered->toString()];
    }

    /**
     * Convert an exception to an array.
     *
     * @param Throwable $exception
     *
     * @return array
     */
    protected function exceptionToArray(Throwable $exception): array
    {
        return [
            'message'   => $exception->getMessage(),
            'exception' => get_class($exception),
            'file'      => str_replace(base_path(), '', $exception->getFile()),
            'line'      => $exception->getLine(),
            /*
            'trace'     => (new Collection($exception->getTrace()))
                ->map(function ($trace) {
                    return Arr::except($trace, ['args']);
                })
                ->all(),
            */
        ];
    }
}

<?php

declare(strict_types=1);

namespace PhpUnitGen\WebApp\Http\Controllers\Api\Version1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Routing\Controller as BaseController;
use PhpUnitGen\Core\Contracts\Generators\MockGenerator;
use PhpUnitGen\Core\Contracts\Renderers\Rendered;
use PhpUnitGen\Core\CoreApplication;
use PhpUnitGen\Core\Parsers\Sources\StringSource;
use PhpUnitGen\WebApp\Http\Controllers\Resources\MockGeneratorResource;
use PhpUnitGen\WebApp\Http\Controllers\Resources\TestGeneratorResource;
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
            $testCode = $this->buildAndExecutePhpUnitGen($config, Arr::get($validatedData, 'code'));
        } catch (Throwable $exception) {
            return new JsonResponse([
                'message'   => 'PhpUnitGen Core execution thrown an exception',
                'exception' => $exception->getMessage(),
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        return new JsonResponse([
            'code'           => $testCode,
            'execution_time' => microtime(true) - $executionTime,
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
            'config'                      => 'required|array',
            'config.automatic_generation' => 'nullable|boolean',
            'config.mock_generator'       => 'required|in:'.$mockGeneratorResource->all()->pluck('id')->implode(','),
            'config.test_generator'       => 'required|in:'.$testGeneratorResource->all()->pluck('id')->implode(','),
            'config.base_namespace'       => 'nullable|string|max:255',
            'config.base_test_namespace'  => 'nullable|string|max:255',
            'config.test_case'            => 'nullable|string|max:255',
            'config.excluded_methods'     => 'nullable|array',
            'config.excluded_methods.*'   => 'nullable|string|max:255',
            'config.merged_php_doc'       => 'nullable|array',
            'config.merged_php_doc.*'     => 'nullable|string|max:255',
            'config.php_doc'              => 'nullable|array',
            'config.php_doc.*'            => 'nullable|string|max:255',
            'config.options'              => 'nullable|array',
            'code'                        => 'required|string|max:10000',
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
            ->mapWithKeys(function ($configValue, $configKey) {
                return [Str::camel($configKey) => $configValue];
            })
            ->toArray();
    }

    /**
     * Build and execute the PhpUnitGen application for given configuration and code.
     *
     * @param array  $config
     * @param string $code
     *
     * @return Rendered
     */
    protected function buildAndExecutePhpUnitGen(array $config, string $code): string
    {
        $phpUnitGen = CoreApplication::make($config);

        return $phpUnitGen->run(new StringSource($code))->toString();
    }
}

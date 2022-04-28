<?php

namespace Tests\PhpUnitGen\WebApp\Feature\Http\Controllers\Api\Version1;

use Tests\PhpUnitGen\WebApp\TestCase;

/**
 * Class TestControllerTest.
 */
class TestControllerTest extends TestCase
{
    public function testItValidatesData(): void
    {
        $response = $this->json('post', '/api/v1/tests')->response;

        $this->assertSame(422, $response->status());
        $this->assertSame([
            'message' => 'validation.required',
            'errors'  => [
                'code' => [
                    'validation.required',
                ],
            ],
        ], json_decode($response->content(), true));

        $response = $this->json('post', '/api/v1/tests', [
            'config' => [
                'automaticGeneration'      => 'invalid',
                'mockGenerator'            => 'invalid',
                'testGenerator'            => 'invalid',
                'baseNamespace'            => false,
                'baseTestNamespace'        => false,
                'testCase'                 => false,
                'testClassFinal'           => 'invalid',
                'testClassStrictTypes'     => 'invalid',
                'testClassTypedProperties' => 'invalid',
                'excludedMethods'          => 'invalid',
                'mergedPhpDoc'             => 'invalid',
                'phpDoc'                   => 'invalid',
                'options'                  => 'invalid',
            ],
            'code'   => false,
        ])->response;

        $this->assertSame(422, $response->status());
        $this->assertSame([
            'message' => 'validation.boolean (and 13 more errors)',
            'errors'  => [
                'config.automaticGeneration'      => [
                    'validation.boolean',
                ],
                'config.mockGenerator'            => [
                    'validation.in',
                ],
                'config.testGenerator'            => [
                    'validation.in',
                ],
                'config.baseNamespace'            => [
                    'validation.string',
                ],
                'config.baseTestNamespace'        => [
                    'validation.string',
                ],
                'config.testCase'                 => [
                    'validation.string',
                ],
                'config.testClassFinal'           => [
                    'validation.boolean',
                ],
                'config.testClassStrictTypes'     => [
                    'validation.boolean',
                ],
                'config.testClassTypedProperties' => [
                    'validation.boolean',
                ],
                'config.excludedMethods'          => [
                    'validation.array',
                ],
                'config.mergedPhpDoc'             => [
                    'validation.array',
                ],
                'config.phpDoc'                   => [
                    'validation.array',
                ],
                'config.options'                  => [
                    'validation.array',
                ],
                'code'                            => [
                    'validation.string',
                ],
            ],
        ], json_decode($response->content(), true));
    }

    public function testItThrowsAnException(): void
    {
        // Send incorrect code.
        $response = $this->json('post', '/api/v1/tests', [
            'code' => '<?php class Person {',
        ])->response;

        $this->assertSame(400, $response->status());
        $this->assertSame([
            'message'   => 'PhpUnitGen Core execution thrown an exception',
            'exception' => [
                'message'   => 'code might have an invalid syntax because AST failed to parse it',
                'exception' => 'PhpUnitGen\\Core\\Exceptions\\InvalidArgumentException',
                'file'      => '/vendor/phpunitgen/core/src/Parsers/CodeParser.php',
                'line'      => 53,
            ],
        ], json_decode($response->content(), true));
    }

    public function testItGeneratesWithDefaultConfig(): void
    {
        $response = $this->json('post', '/api/v1/tests', [
            'code' => '<?php class Person { public function __construct(Service $s) {} public function dummy() {} }',
        ])->response;

        $this->assertSame(200, $response->status());

        $responseContent = json_decode($response->content(), true);
        $this->assertSame('PersonTest', $responseContent['name']);
        $this->assertIsFloat($responseContent['executionTime']);
        $this->assertStringContainsString('namespace Tests\\Unit;', $responseContent['code']);
        $this->assertStringContainsString('use Mockery;', $responseContent['code']);
    }

    public function testItGeneratesWithCustomConfig(): void
    {
        $response = $this->json('post', '/api/v1/tests', [
            'code'   => '<?php class Person { public function __construct(Service $s) {} public function dummy() {} }',
            'config' => [
                'baseTestNamespace' => 'MyBaseTests',
                'mockGenerator'     => 'phpunit',
                'testGenerator'     => 'basic',
            ],
        ])->response;

        $this->assertSame(200, $response->status());

        $responseContent = json_decode($response->content(), true);
        $this->assertSame('PersonTest', $responseContent['name']);
        $this->assertIsFloat($responseContent['executionTime']);
        $this->assertStringContainsString('namespace MyBaseTests;', $responseContent['code']);
        $this->assertStringContainsString('use PHPUnit\\Framework\\MockObject\\MockObject;', $responseContent['code']);
    }
}

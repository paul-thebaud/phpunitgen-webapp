<?php

namespace Tests\PhpUnitGen\WebApp\Feature\Http\Controllers\Api\Version1;

use Tests\PhpUnitGen\WebApp\TestCase;

/**
 * Class MockGeneratorControllerTest.
 */
class MockGeneratorControllerTest extends TestCase
{
    public function testAll(): void
    {
        $response = $this->json('get', '/api/v1/mock-generators')->response;

        $this->assertSame(200, $response->status());
        $this->assertCount(2, json_decode($response->content(), true));
    }

    public function testShowWithInvalidId(): void
    {
        $response = $this->json('get', '/api/v1/mock-generators/invalid')->response;

        $this->assertSame(404, $response->status());
    }

    public function testShowWithValidId(): void
    {
        $response = $this->json('get', '/api/v1/mock-generators/phpunit')->response;

        $this->assertSame(200, $response->status());
        $this->assertSame([
            'id'          => 'phpunit',
            'class'       => 'PhpUnitGen\Core\Generators\Mocks\PhpUnitMockGenerator',
            'website'     => 'https://phpunit.de/',
            'source'      => 'https://github.com/paul-thebaud/phpunitgen-core/blob/master/src/Generators/Mocks/PhpUnitMockGenerator.php',
            'name'        => 'PHPUnit',
            'description' => 'Mocks will be generated using the PHPUnit syntax, such as "$this->getMock()".',
        ], json_decode($response->content(), true));
    }

    public function testShowWithValidIdAndCustomLanguage(): void
    {
        $response = $this->json('get', '/api/v1/mock-generators/phpunit', [], [
            'Accept-Language' => 'fr_FR',
        ])->response;

        $this->assertSame(200, $response->status());
        $this->assertSame([
            'id'          => 'phpunit',
            'class'       => 'PhpUnitGen\Core\Generators\Mocks\PhpUnitMockGenerator',
            'website'     => 'https://phpunit.de/',
            'source'      => 'https://github.com/paul-thebaud/phpunitgen-core/blob/master/src/Generators/Mocks/PhpUnitMockGenerator.php',
            'name'        => 'PHPUnit',
            'description' => 'Les mocks seront générés en utilisant la syntaxe PHPUnit, comme par exemple "$this->getMock()".',
        ], json_decode($response->content(), true));
    }
}

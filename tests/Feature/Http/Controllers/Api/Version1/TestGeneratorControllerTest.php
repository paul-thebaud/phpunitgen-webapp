<?php

namespace Tests\PhpUnitGen\WebApp\Feature\Http\Controllers\Api\Version1;

use Illuminate\Support\Arr;
use Tests\PhpUnitGen\WebApp\TestCase;

/**
 * Class TestGeneratorControllerTest.
 */
class TestGeneratorControllerTest extends TestCase
{
    public function testAll(): void
    {
        $response = $this->json('get', '/api/v1/test-generators')->response;

        $this->assertSame(200, $response->status());
        $this->assertCount(11, json_decode($response->content(), true));
    }

    public function testShowWithInvalidId(): void
    {
        $response = $this->json('get', '/api/v1/test-generators/invalid')->response;

        $this->assertSame(404, $response->status());
    }

    public function testShowWithValidId(): void
    {
        $response = $this->json('get', '/api/v1/test-generators/laravel.command')->response;

        $this->assertSame(200, $response->status());

        $content = Arr::except(json_decode($response->content(), true), 'example');

        $this->assertSame([
            'id'          => 'laravel.command',
            'class'       => 'PhpUnitGen\Core\Generators\Tests\Laravel\Command\CommandTestGenerator',
            'source'      => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Command',
            'name'        => 'Laravel Command',
            'description' => 'Generates a skeleton adapted to a command of the Laravel Framework. Generates a special test for the "handle" method using the command name.',
        ], $content);
    }

    public function testShowWithValidIdAndCustomLanguage(): void
    {
        $response = $this->json('get', '/api/v1/test-generators/laravel.command', [], [
            'Accept-Language' => 'fr_FR',
        ])->response;

        $this->assertSame(200, $response->status());

        $content = Arr::except(json_decode($response->content(), true), 'example');

        $this->assertSame([
            'id'          => 'laravel.command',
            'class'       => 'PhpUnitGen\Core\Generators\Tests\Laravel\Command\CommandTestGenerator',
            'source'      => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Command',
            'name'        => 'Commande Laravel',
            'description' => 'Génère un squelette adapté à une commande du framework Laravel. Génère un test particulier pour la méthode "handle", en se servant du nom de la commande.',
        ], $content);
    }
}

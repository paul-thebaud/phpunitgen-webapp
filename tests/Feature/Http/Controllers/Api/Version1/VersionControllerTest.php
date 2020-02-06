<?php

namespace Tests\PhpUnitGen\WebApp\Feature\Http\Controllers;

use PackageVersions\Versions;
use PhpUnitGen\Core\Helpers\Str;
use Tests\PhpUnitGen\WebApp\TestCase;

/**
 * Class VersionControllerTest.
 */
class VersionControllerTest extends TestCase
{
    public function testVersionsAreReturned(): void
    {
        $response = $this->json('get', '/api/v1')->response;

        $this->assertSame(200, $response->status());
        $this->assertSame([
            'coreVersion' => Str::beforeLast('@', Versions::getVersion('phpunitgen/core')),
            'apiVersion'  => 'v1',
        ], json_decode($response->content(), true));
    }

    public function testVersionsAreReturnedWhenVersionIsNotDefined(): void
    {
        $response = $this->json('get', '/api')->response;

        $this->assertSame(200, $response->status());
        $this->assertSame([
            'coreVersion' => Str::beforeLast('@', Versions::getVersion('phpunitgen/core')),
            'apiVersion'  => 'v1',
        ], json_decode($response->content(), true));
    }
}

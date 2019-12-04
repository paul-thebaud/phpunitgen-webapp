<?php

namespace Tests\PhpUnitGen\WebApp\Feature\Http\Controllers;

use Tests\PhpUnitGen\WebApp\TestCase;

/**
 * Class DocsControllerTest.
 *
 * @covers \PhpUnitGen\WebApp\Http\Controllers\DocsController
 */
class DocsControllerTest extends TestCase
{
    public function testDocsViewIsDisplayed(): void
    {
        $response = $this->get('/docs')
            ->seeStatusCode(200)
            ->response;

        $this->assertSame(view('docs')->render(), $response->content());
    }
}

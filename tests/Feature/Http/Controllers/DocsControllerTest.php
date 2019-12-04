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
        $response = $this->get('/docs')->response;
        dump($response->content());
        dump($response->exception);

        $this->assertSame(200, $response->status());
        $this->assertSame(view('docs')->render(), $response->content());
    }
}

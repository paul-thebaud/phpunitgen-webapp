<?php

namespace Tests\PhpUnitGen\WebApp\Feature\Http\Controllers;

use Tests\PhpUnitGen\WebApp\TestCase;

/**
 * Class DocsControllerTest.
 */
class DocsControllerTest extends TestCase
{
    public function testDocsViewIsDisplayed(): void
    {
        $response = $this->get('/docs')->response;

        $this->assertSame(200, $response->status());
        $this->assertSame(view('docs')->render(), $response->content());
    }
}

<?php

namespace Tests\PhpUnitGen\WebApp\Feature\Http\Controllers;

use Tests\PhpUnitGen\WebApp\TestCase;

/**
 * Class AppControllerTest.
 */
class AppControllerTest extends TestCase
{
    public function testAppIndexIsDisplayed(): void
    {
        $response = $this->get('/')->response;

        $this->assertSame(200, $response->status());
        $this->assertSame(view('app')->render(), $response->content());
    }

    public function testAppToolIsDisplayed(): void
    {
        $response = $this->get('/tool')->response;

        $this->assertSame(200, $response->status());
        $this->assertSame(view('app')->render(), $response->content());
    }

    public function testAppThemesIsDisplayed(): void
    {
        $response = $this->get('/tool')->response;

        $this->assertSame(200, $response->status());
        $this->assertSame(view('app')->render(), $response->content());
    }

    public function testAppConfigurationIsDisplayed(): void
    {
        $response = $this->get('/configuration')->response;

        $this->assertSame(200, $response->status());
        $this->assertSame(view('app')->render(), $response->content());
    }

    public function testAppLegalIsDisplayed(): void
    {
        $response = $this->get('/legal')->response;

        $this->assertSame(200, $response->status());
        $this->assertSame(view('app')->render(), $response->content());
    }

    public function testAnythingElseResultsInNotFound(): void
    {
        $response = $this->get('/anything')->response;

        $this->assertSame(404, $response->status());
        $this->assertSame(view('app')->render(), $response->content());
    }
}

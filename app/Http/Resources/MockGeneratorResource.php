<?php

namespace PhpUnitGen\WebApp\Http\Resources;

/**
 * Class MockGeneratorResource.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class MockGeneratorResource extends AbstractResource
{
    /**
     * {@inheritdoc}
     */
    protected function map(array $item): array
    {
        $item['name'] = $this->translator->get("mock-generators.{$item['id']}.name");
        $item['description'] = $this->translator->get("mock-generators.{$item['id']}.description");

        return $item;
    }

    /**
     * {@inheritdoc}
     */
    protected function resourcePath(): string
    {
        return 'mock_generators';
    }
}

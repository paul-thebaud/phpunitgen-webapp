<?php

namespace PhpUnitGen\WebApp\Http\Controllers\Resources;

/**
 * Class TestGeneratorResource.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
class TestGeneratorResource extends AbstractResource
{
    /**
     * {@inheritdoc}
     */
    protected function map(array $item): array
    {
        $item['name'] = $this->translator->trans("test-generators.{$item['id']}.name");
        $item['description'] = $this->translator->trans("test-generators.{$item['id']}.description");
        $item['example'] = file_get_contents(resource_path('data/examples/'.$item['example']));

        return $item;
    }

    /**
     * {@inheritdoc}
     */
    protected function resourcePath(): string
    {
        return 'test_generators';
    }
}

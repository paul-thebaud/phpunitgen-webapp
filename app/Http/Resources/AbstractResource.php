<?php

namespace PhpUnitGen\WebApp\Http\Resources;

use Illuminate\Contracts\Translation\Translator;
use Illuminate\Support\Collection;

/**
 * Class AbstractResource.
 *
 * @author  Paul Thébaud <paul.thebaud29@gmail.com>
 * @author  Killian Hascoët <killianh@live.fr>
 * @license MIT
 */
abstract class AbstractResource
{
    /**
     * @var Collection|null The already retrieved resource collection.
     */
    protected ?Collection $collection = null;

    /**
     * @var Translator The translator used when some items attributes need it.
     */
    protected Translator $translator;

    /**
     * AbstractResource constructor.
     *
     * @param Translator $translator
     */
    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }

    /**
     * Retrieve all items from collection.
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->getCollection();
    }

    /**
     * Retrieve one item from collection.
     *
     * @param string $id
     *
     * @return array|null
     */
    public function find(string $id): ?array
    {
        return $this->getCollection()->where('id', $id)->first();
    }

    /**
     * Get (and save as instance property if needed) the target resource collection.
     *
     * @return Collection
     */
    protected function getCollection(): Collection
    {
        if (! $this->collection) {
            $data = require resource_path("data/{$this->resourcePath()}.php");

            $this->collection = (new Collection($data))
                ->map(fn ($item) => $this->map($item));
        }

        return $this->collection;
    }

    /**
     * Map the data to add/remove attributes on first retrieve from data directory.
     *
     * @param array $item
     *
     * @return array
     */
    protected function map(array $item): array
    {
        return $item;
    }

    /**
     * Retrieves the path to the resource in the "resources/data" directory.
     *
     * @return string
     */
    abstract protected function resourcePath(): string;
}

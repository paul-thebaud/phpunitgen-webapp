<?php

use PhpUnitGen\Core\Generators\Mocks\MockeryMockGenerator;
use PhpUnitGen\Core\Generators\Mocks\PhpUnitMockGenerator;

return [
    [
        'id'          => 'mockery',
        'class'       => MockeryMockGenerator::class,
        'website'     => 'http://docs.mockery.io/',
        'author'      => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
    ],
    [
        'id'          => 'phpunit',
        'class'       => PhpUnitMockGenerator::class,
        'website'     => 'https://phpunit.de/',
        'author'      => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
    ],
];

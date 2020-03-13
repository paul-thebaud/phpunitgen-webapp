<?php

use PhpUnitGen\Core\Generators\Mocks\MockeryMockGenerator;
use PhpUnitGen\Core\Generators\Mocks\PhpUnitMockGenerator;

return [
    [
        'id'      => 'mockery',
        'class'   => MockeryMockGenerator::class,
        'website' => 'http://docs.mockery.io/',
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/blob/master/src/Generators/Mocks/MockeryMockGenerator.php',
    ],
    [
        'id'      => 'phpunit',
        'class'   => PhpUnitMockGenerator::class,
        'website' => 'https://phpunit.de/',
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/blob/master/src/Generators/Mocks/PhpUnitMockGenerator.php',
    ],
];

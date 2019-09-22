<?php

use PhpUnitGen\Core\Generators\Tests\Basic\BasicTestGenerator;
use PhpUnitGen\Core\Generators\Tests\DelegateTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Policy\PolicyTestGenerator;

return [
    [
        'id'      => 'delegate',
        'class'   => DelegateTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'Person.php',
    ],
    [
        'id'      => 'basic',
        'class'   => BasicTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'Person.php',
    ],
    [
        'id'      => 'laravel.policy',
        'class'   => PolicyTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'laravel/PostPolicy.php',
    ],
];

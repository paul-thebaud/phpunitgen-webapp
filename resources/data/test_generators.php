<?php

use PhpUnitGen\Core\Generators\Tests\Basic\BasicTestGenerator;
use PhpUnitGen\Core\Generators\Tests\DelegateTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Channel\ChannelTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Command\CommandTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Policy\PolicyTestGenerator;

return [
    [
        'id'      => 'delegate',
        'class'   => DelegateTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'Person.stub',
    ],
    [
        'id'      => 'basic',
        'class'   => BasicTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'Person.stub',
    ],
    [
        'id'      => 'laravel.channel',
        'class'   => ChannelTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'laravel/NewPostChannel.stub',
    ],
    [
        'id'      => 'laravel.command',
        'class'   => CommandTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'laravel/PrunePostsCommand.stub',
    ],
    [
        'id'      => 'laravel.policy',
        'class'   => PolicyTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'laravel/PostPolicy.stub',
    ],
];

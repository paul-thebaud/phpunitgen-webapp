<?php

use PhpUnitGen\Core\Generators\Tests\Basic\BasicTestGenerator;
use PhpUnitGen\Core\Generators\Tests\DelegateTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Channel\ChannelTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Command\CommandTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Controller\ControllerTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Job\JobTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\LaravelTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Listener\ListenerTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Policy\PolicyTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Resource\ResourceTestGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Rule\RuleTestGenerator;

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
        'id'      => 'laravel.basic',
        'class'   => LaravelTestGenerator::class,
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
        'id'      => 'laravel.controller',
        'class'   => ControllerTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'laravel/PrunePostsCommand.stub',
    ],
    [
        'id'      => 'laravel.job',
        'class'   => JobTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'laravel/PrunePostsCommand.stub',
    ],
    [
        'id'      => 'laravel.listener',
        'class'   => ListenerTestGenerator::class,
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
    [
        'id'      => 'laravel.resource',
        'class'   => ResourceTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'laravel/PostPolicy.stub',
    ],
    [
        'id'      => 'laravel.rule',
        'class'   => RuleTestGenerator::class,
        'author'  => [
            'name'    => 'Paul Thébaud',
            'website' => 'https://github.com/paul-thebaud',
        ],
        'example' => 'laravel/PostPolicy.stub',
    ],
];

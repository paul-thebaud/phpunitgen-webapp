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
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests',
        'example' => 'Person.stub',
    ],
    [
        'id'      => 'basic',
        'class'   => BasicTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Basic',
        'example' => 'Person.stub',
    ],
    [
        'id'      => 'laravel.basic',
        'class'   => LaravelTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel',
        'example' => 'Person.stub',
    ],
    [
        'id'      => 'laravel.channel',
        'class'   => ChannelTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Channel',
        'example' => 'laravel/NewPostChannel.stub',
    ],
    [
        'id'      => 'laravel.command',
        'class'   => CommandTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Command',
        'example' => 'laravel/PrunePostsCommand.stub',
    ],
    [
        'id'      => 'laravel.controller',
        'class'   => ControllerTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Controller',
        'example' => 'laravel/PostController.stub',
    ],
    [
        'id'      => 'laravel.job',
        'class'   => JobTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Job',
        'example' => 'laravel/PublishPostJob.stub',
    ],
    [
        'id'      => 'laravel.listener',
        'class'   => ListenerTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Listener',
        'example' => 'laravel/NewPostListener.stub',
    ],
    [
        'id'      => 'laravel.policy',
        'class'   => PolicyTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Policy',
        'example' => 'laravel/PostPolicy.stub',
    ],
    [
        'id'      => 'laravel.resource',
        'class'   => ResourceTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Resource',
        'example' => 'laravel/PostResource.stub',
    ],
    [
        'id'      => 'laravel.rule',
        'class'   => RuleTestGenerator::class,
        'source'  => 'https://github.com/paul-thebaud/phpunitgen-core/tree/main/src/Generators/Tests/Laravel/Rule',
        'example' => 'laravel/PostContentRule.stub',
    ],
];

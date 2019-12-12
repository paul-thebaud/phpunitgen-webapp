<?php

return [
    'delegate' => [
        'name'        => 'Delegate',
        'description' => 'Uses the class and the given context to choose an adapted tests generator.',
    ],
    'basic'    => [
        'name'        => 'Basic',
        'description' => 'Generates a basic skeleton for a PHP class. Can instantiate the class and manages getter/setter methods.',
    ],
    'laravel'  => [
        'basic'      => [
            'name'        => 'Laravel class',
            'description' => 'Generates a skeleton adapted to a class in a Laravel project.',
        ],
        'channel'    => [
            'name'        => 'Laravel Channel',
            'description' => 'Generates a skeleton adapted to a broadcasting channel of the Laravel Framework. Generates two tests for the "join" method (one for authorization, the other for rejection).',
        ],
        'command'    => [
            'name'        => 'Laravel Command',
            'description' => 'Generates a skeleton adapted to a command of the Laravel Framework. Generates a special test for the "handle" method using the command name.',
        ],
        'controller' => [
            'name'        => 'Contrôleur Laravel',
            'description' => 'Generates a skeleton adapted to a controller of the Laravel Framework. Generates parts of test to make HTTP calls in test.',
        ],
        'job'        => [
            'name'        => 'Job Laravel',
            'description' => 'Generates a skeleton adapted to a job of the Laravel Framework. Generates a special test for the "handle" method.',
        ],
        'listener'   => [
            'name'        => 'Ecouteur Laravel',
            'description' => 'Generates a skeleton adapted to a listener of the Laravel Framework. Generates a special test for the "handle" method.',
        ],
        'policy'     => [
            'name'        => 'Laravel Policy',
            'description' => 'Generates a skeleton adapted to a policy of the Laravel Framework. Generates two tests by non-static methods (one for authorization, the other for rejection).',
        ],
        'resource'   => [
            'name'        => 'Ressource Laravel',
            'description' => 'Generates a skeleton adapted to a resource of the Laravel Framework. Generates a special test for the "toArray" method.',
        ],
        'rule'       => [
            'name'        => 'Règle Laravel',
            'description' => 'Generates a skeleton adapted to a rule of the Laravel Framework. Generates two tests for the "passes" method (one for validation, the other for rejection).',
        ],
    ],
];

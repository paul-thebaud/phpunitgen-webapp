<?php

return [
    'delegate' => [
        'name'        => 'Delegate',
        'description' => "Uses the class and the given context to choose an adapted tests generator.",
    ],
    'basic'    => [
        'name'        => 'Basic',
        'description' => "Generates a basic skeleton for a PHP class. Can instantiate the class and manages getter/setter methods.",
    ],
    'laravel'  => [
        'channel' => [
            'name'        => 'Laravel Channel',
            'description' => "Generates a skeleton adapted to a broadcasting channel of the Laravel Framework. Generates two tests for the \"join\" method (one for authorization, the other for rejection).",
        ],
        'command' => [
            'name'        => 'Laravel Command',
            'description' => "Generates a skeleton adapted to a command of the Laravel Framework. Generates a special test for the \"handle\" method using the command name.",
        ],
        'policy'  => [
            'name'        => 'Laravel Policy',
            'description' => "Generates a skeleton adapted to a policy of the Laravel Framework. Generates two tests by non-static methods (one for authorization, the other for rejection).",
        ],
    ],
];

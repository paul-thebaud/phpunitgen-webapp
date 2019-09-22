<?php

return [
    'delegate' => [
        'name'        => 'Delegate',
        'description' => "It chooses a generator according to some characteristics of the class (namespace, name, etc) to generate the most adapted tests.",
    ],
    'basic'    => [
        'name'        => 'Basic',
        'description' => 'It generates empty tests for a classic PHP class. With automatic generation, it handles class instantiation and getter/setter methods.',
    ],
    'laravel'  => [
        'policy' => [
            'name'        => 'Laravel Policy',
            'description' => 'It generates empty tests for a Laravel Policy class. With automatic generation, it generates two methods per method to test.',
        ],
    ],
];

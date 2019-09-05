<?php

return [
    'basic'   => [
        'name'        => 'Basique',
        'description' => "Il génère les tests vides pour une classe PHP. Avec la génération automatique, il instancie la classe et gère les méthodes getter/setter.",
    ],
    'laravel' => [
        'policy' => [
            'name'        => 'Policy Laravel',
            'description' => "Il génère les tests vides pour une classe de Policy de Laravel. Avec la génération automatique, il génère deux méthodes de tests par méthode à tester.",
        ],
    ],
];

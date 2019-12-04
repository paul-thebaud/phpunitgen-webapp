<?php

return [
    'delegate' => [
        'name'        => 'Délégué',
        'description' => 'Utilise la classe et le contexte fourni dans la configuration pour choisir un générateur de tests adapté.',
    ],
    'basic'    => [
        'name'        => 'Basique',
        'description' => 'Génère un squelette basique pour une classe PHP. Peut instancier la classe et gérer les méthodes getter/setter.',
    ],
    'laravel'  => [
        'channel' => [
            'name'        => 'Canal Laravel',
            'description' => "Génère un squelette adapté à un canal de diffusion du framework Laravel. Génère deux tests pour la méthode \"join\" (un pour l'authorisation, l'autre pour le rejet).",
        ],
        'command' => [
            'name'        => 'Commande Laravel',
            'description' => 'Génère un squelette adapté à une commande du framework Laravel. Génère un test particulier pour la méthode "handle", en se servant du nom de la commande.',
        ],
        'policy' => [
            'name'        => 'Policy Laravel',
            'description' => "Génère un squelette adapté à une Policy du framework Laravel. Génère deux tests par méthodes (un pour l'authorisation, l'autre pour le rejet).",
        ],
    ],
];

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
        'basic'      => [
            'name'        => 'Classe Laravel',
            'description' => "Génère un squelette adapté à une classe au sein d'une projet Laravel.",
        ],
        'channel'    => [
            'name'        => 'Canal Laravel',
            'description' => 'Génère un squelette adapté à un canal de diffusion du framework Laravel. Génère deux tests pour la méthode "join" (un pour l\'authorisation, l\'autre pour le rejet).',
        ],
        'command'    => [
            'name'        => 'Commande Laravel',
            'description' => 'Génère un squelette adapté à une commande du framework Laravel. Génère un test particulier pour la méthode "handle", en se servant du nom de la commande.',
        ],
        'controller' => [
            'name'        => 'Contrôleur Laravel',
            'description' => 'Génère un squelette adapté à un contrôleur du framework Laravel. Génère des bouts de tests permettant de faire des appels HTTP de test.',
        ],
        'job'        => [
            'name'        => 'Job Laravel',
            'description' => 'Génère un squelette adapté à un job du framework Laravel. Génère un test particulier pour la méthode "handle".',
        ],
        'listener'   => [
            'name'        => 'Ecouteur Laravel',
            'description' => 'Génère un squelette adapté à un écouteur du framework Laravel. Génère un test particulier pour la méthode "handle".',
        ],
        'policy'     => [
            'name'        => 'Police Laravel',
            'description' => "Génère un squelette adapté à une police d'autorisation du framework Laravel. Génère deux tests par méthodes (un pour l'authorisation, l'autre pour le rejet).",
        ],
        'resource'   => [
            'name'        => 'Ressource Laravel',
            'description' => 'Génère un squelette adapté à une ressource du framework Laravel. Génère un test particulier pour la méthode "toArray".',
        ],
        'rule'       => [
            'name'        => 'Règle Laravel',
            'description' => 'Génère un squelette adapté à une règle du framework Laravel. Génère deux tests pour la méthode "passes" (un pour la validation, l\'autre pour le rejet).',
        ],
    ],
];

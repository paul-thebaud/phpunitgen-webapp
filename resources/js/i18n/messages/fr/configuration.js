export default {
    'title': 'Configuration',
    'description': 'Cette page vous permet de configurer une grande partie du fonctionnement de PhpUnitGen. Toute la configuration est sauvegardée dans votre navigateur.',
    'automatic_generation': {
        'name': 'Génération automatique',
        'help': 'Définit si le générateur doit tenter de générer des propriétés et des tests avancés ou juste des méthodes vides à remplir.',
    },
    'test_generator': {
        'name': 'Générateur de tests',
        'help': 'Définit la façon dont le test est généré (les propriétés, méthodes, etc). Si vous ne trouvez le générateur qui vous convient, créez une pull-request sur le cœur de PhpUnitGen pour l\'ajouter, ou ouvrez une issue pour nous le demander !',
    },
    'mock_generator': {
        'name': 'Librairie à utiliser pour les mocks',
        'help': 'Définit la librairie à utiliser pour mocker des objets. Si la librairie que vous utilisez n\'est pas disponible, créez une pull-request sur le cœur de PhpUnitGen pour l\'ajouter, ou ouvrez une issue pour nous la demander !',
    },
    'base_namespace': {
        'name': 'Namespace de base',
        'placeholder': 'PhpUnitGen\\App',
        'help': 'Définit le namespace de base de votre code source. Il sera remplacé par le namespace de test.',
    },
    'base_test_namespace': {
        'name': 'Namespace de base des tests',
        'placeholder': 'PhpUnitGen\\Tests',
        'help': 'Définit le namespace de base de vos tests. Il remplace votre namespace de base.',
    },
    'test_case': {
        'name': 'Classe "TestCase" à étendre',
        'placeholder': 'PHPUnit\\Framework\\TestCase',
        'help': 'Définit le nom absolu de la classe "TestCase" à étendre dans le test.',
    },
    'excluded_methods': {
        'name': 'Méthodes à exclure de la génération',
        'placeholder': '__construct',
        'help': 'Définit les méthodes pour lesquelles aucun squelette de tests ne doit être généré. Peut être au format d\'une expression régulière ("__.*" par exemple).',
    },
    'merged_php_doc': {
        'name': 'Annotation PHPDoc à conserver',
        'placeholder': 'author',
        'help': 'Définit les annotations PHPDoc qui doivent être récupérées dans la classe à tester et réinjectées dans la classe de test.',
    },
    'php_doc': {
        'name': 'Annotation PHPDoc à ajouter',
        'placeholder': '@author John Doe',
        'help': 'Définit les annotations PHPDoc qui doivent être ajoutées dans la classe de test.',
    },
    'options': {
        'name': 'Options',
        'placeholder_key': 'context',
        'placeholder_value': 'laravel',
        'help': 'Définit les options à utiliser dans les générateurs. Pour plus de détails, référez-vous à la documentation.',
    },
    'state': {
        'saving': 'Sauvegarde en cours ...',
        'saved': 'Sauvegardée',
    },
    'list_field': {
        'display_more': 'Afficher plus',
        'created_by': 'Créé par',
        'search': 'Recherche ...',
        'no_result': 'Aucun résultat correspondant à la recherche.',
    },
};

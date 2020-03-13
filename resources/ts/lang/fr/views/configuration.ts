export default {
    "title": "Configuration",
    "description": "Voici la liste des options pour PhpUnitGen. Elles seront utilisées pour vos générations de tests, et sont sauvegardées dans votre navigateur.",
    "quickLinks": "Liens rapides vers les champs",
    "state": {
        "saving": "Sauvegarde en cours ...",
        "saved": "Configuration sauvegardée",
    },
    "forceEditorTabs": {
        "label": "Affichage en onglet",
        "help": "Force l'affichage des éditeurs en onglets, y compris sur les grands écrans.",
    },
    "automaticGeneration": {
        "label": "Génération automatique",
        "help": "Définit si le générateur doit tenter de générer des propriétés et des tests avancés ou juste des méthodes vides à remplir.",
    },
    "testGenerator": {
        "label": "Générateur de test",
        "help": "Définit la façon dont le test est généré (les propriétés, méthodes, etc). Si vous ne trouvez le générateur qui vous convient, créez une pull-request sur le cœur de PhpUnitGen pour l'ajouter, ou ouvrez une issue pour nous le demander !",
        "sourceCode": "Code source",
    },
    "mockGenerator": {
        "label": "Librairie à utiliser pour les mocks",
        "help": "Définit la librairie à utiliser pour mocker des objets. Si la librairie que vous utilisez n'est pas disponible, créez une pull-request sur le cœur de PhpUnitGen pour l'ajouter, ou ouvrez une issue pour nous la demander !",
        "sourceCode": "Code source",
    },
    "baseNamespace": {
        "label": "Namespace de base",
        "placeholder": "App",
        "help": "Définit le namespace de base de votre code source. Il sera remplacé par le namespace de test.",
    },
    "baseTestNamespace": {
        "label": "Namespace de base des tests",
        "placeholder": "Tests",
        "help": "Définit le namespace de base de vos tests. Il remplace votre namespace de base.",
    },
    "testCase": {
        "label": "Classe \"TestCase\" à étendre",
        "placeholder": "Tests\\TestCase",
        "help": "Définit le nom absolu de la classe \"TestCase\" à étendre dans le test.",
    },
    "excludedMethods": {
        "label": "Méthodes à exclure de la génération",
        "placeholder": "__construct",
        "help": "Définit les méthodes pour lesquelles aucun squelette de tests ne doit être généré. Peut être au format d'une expression régulière (\"__.*\" par exemple pour exclure les méthodes magiques).",
    },
    "mergedPhpDoc": {
        "label": "Annotation PHPDoc à conserver",
        "placeholder": "author",
        "help": "Définit les annotations PHPDoc qui doivent être récupérées dans la classe à tester et réinjectées dans la classe de test.",
    },
    "phpDoc": {
        "label": "Annotation PHPDoc à ajouter",
        "placeholder": "@author John Doe",
        "help": "Définit les annotations PHPDoc qui doivent être ajoutées dans la classe de test.",
    },
    "optionsContext": {
        "label": "Contexte du projet",
        "help": "Définit le contexte du projet. Permet à certains générateurs de générer du code plus précis (namespace, etc).",
        "values": {
            "laravel": "Laravel",
            "null": "Autre",
        },
    },
    "optionsLaravelUser": {
        "label": "Classe User pour les projets Laravel",
        "placeholder": "App\\User",
        "help": "Définit la classe du modèle Eloquent du User à utiliser dans les tests qui en ont besoin.",
    },
};

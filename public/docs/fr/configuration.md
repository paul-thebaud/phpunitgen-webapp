# Configuration

La configuration de PhpUnitGen est la même sur l'application Web ou la ligne
de commande, car elle est intégrée au cœur de l'outil.

Elle vous permet de personnaliser la génération de vos tests, via différents paramètres.

Si vous pensez qu'une option de configuration est manquante, n'hésitez pas à nous la proposer.

!> L'outil en ligne de commande dispose de quelques options supplémentaires dûes
à son fonctionnement, vous pouvez les voir [ici](/fr/command-line.md#configuration).

## Paramètres de la configuration

Voici une liste des paramètres de configuration de PhpUnitGen. Peu importe la version de l'outil
que utilisez, vous trouverez chacunes de ces clés de configuration.

Si un clé de configuration n'est pas précisée, la valeur par défaut sera utilisée.
[Voir la configuration par défault](https://github.com/paul-thebaud/phpunitgen-core/blob/master/config/phpunitgen.php).

### Génération automatique

* **Clé du paramètre** : `automaticGeneration`
* **Type** : `booléen`
* **Valeur par défaut**: `true`
* **Description** : Définit si le générateur doit tenter de générer des propriétés et des tests
avancés ou juste des méthodes vides à remplir.

### Implémentations à utiliser

* **Clé du paramètre** : `implementations`
* **Type** : `tableau (les clés étant les interfaces et les valeurs les implémentations à utiliser)`
* **Valeur par défaut**: générateur de test délégué et générateur de mock pour Mockery.
* **Description** : Définit les implémentations à utiliser pour toutes les étapes de PhpUnitGen.

Voici un exemple de valeur dans une configuration au format `PHP` :

```php
use PhpUnitGen\Core\Contracts\Parsers\CodeParser as CodeParserContract;
use PhpUnitGen\Core\Generators\Tests\DelegateTestGenerator;

return [
    // Utilisation des implémentations d'un générateur.
    // "implementations()" retourne toutes les implementations
    // nécessaires au bon fonctionnement du générateur.
    'implementations' => DelegateTestGenerator::implementations(),
    // Utilisation des implémentations d'un générateur,
    // avec surcharge de certaines implémenations.
    'implementations' => array_merge([
        CodeParserContract::class => MyCodeParserImpl::class,
    ], DelegateTestGenerator::implementations()),
];
```

> Si vous souhaitez en apprendre plus sur les différents générateurs de tests/mocks disponibles, vous pouvez
> aller sur la [page de configuration](https://phpunitgen.io/configuration) de l'application
> web, sur laquelle chacun des générateurs est décrits par une tooltip.

!> Sur la version web, il est uniquement possible de choisir l'implémentation du générateur de tests
ou du générateur de mocks.

!> Sachez que lorsque vous configurez les implémentations, vous pouvez ne fournir que certaines implémenations,
et PhpUnitGen se chargera de remplir les autres avec des valeurs par défaut. Seul le générateur de test est obligatoire.

### Namespace de base

* **Clé du paramètre** : `baseNamespace`
* **Type** : `chaîne de caractères`
* **Valeur par défaut**: `""`
* **Description** : Définit le namespace de base de votre code source. Il sera remplacé par le
namespace de test.

### Namespace de base des tests

* **Clé du paramètre** : `baseTestNamespace`
* **Type** : `chaîne de caractères`
* **Valeur par défaut**: `"Tests"`
* **Description** : Définit le namespace de base de vos tests. Il remplace votre namespace de base.

### Classe "TestCase" à étendre

* **Clé du paramètre** : `testCase`
* **Type** : `chaîne de caractères`
* **Valeur par défaut**: `"PHPUnit\\Framework\\TestCase"`
* **Description** : Définit le nom absolu de la classe "TestCase" à étendre dans le test.

### Méthodes à exclure de la génération

* **Clé du paramètre** : `excludedMethods`
* **Type** : `tableau de chaînes de caractères`
* **Valeur par défaut**: `[ "__construct", "__destruct" ]`
* **Description** : Définit les méthodes pour lesquelles aucun squelette de tests ne doit être généré. Peut être au
format d'une expression régulière ("__.*" par exemple pour exclure les méthodes magiques).

### Annotation PHPDoc à conserver

* **Clé du paramètre** : `mergedPhpDoc`
* **Type** : `tableau de chaînes de caractères`
* **Valeur par défaut**: `[ "author", "copyright", "license", "version" ]`
* **Description** : Définit les annotations PHPDoc qui doivent être récupérées dans la classe à tester et réinjectées
dans la classe de test ("license" par exemple).

### Annotation PHPDoc à ajouter

* **Clé du paramètre** : `phpDoc`
* **Type** : `tableau de chaînes de caractères`
* **Valeur par défaut**: `[ ]`
* **Description** : Définit les annotations PHPDoc qui doivent être ajoutées dans la classe de test
(par exemple "@author John Doe").

### Options

* **Clé du paramètre** : `options`
* **Type** : `tableau (les clés étant des chaînes de caractères, les valeurs de n'importe quel type)`
* **Description** : Définit les options à utiliser, qui sont propres à certains/plusieurs
générateur de tests.

> Chaque option est directement disponible sur l'application web
> en tant que paramètre de configuration individuel, pour une personnalisation plus aisée.

#### Liste des options disponibles

* **Clé de l'option** : `context`
* **Type** : `chaîne de caractères ou null`
* **Valeur par défaut**: `"laravel"`
* **Description** : Définit le contexte de votre projet. Utilisée par le générateur délégué
pour choisir le générateur le plus adapté à votre type projet.
Pour l'instant, deux valeurs sont possible : `"laravel"`, et `null` (pour tous les autres projets).


* **Clé de l'option** : `laravel.user`
* **Type** : `chaîne de caractères`
* **Valeur par défaut**: `"App\\User"`
* **Description** : Définit la classe du modèle Eloquent User pour un projet dont le contexte
est `laravel`. Utilisée par plusieurs générateurs propres à Laravel afin d'importer correctement
la classe User quand celle-ci est nécessaire dans les tests (par exemple pour tester une Policy).

# Ligne de commande

La ligne de commande vous permet de générer des tests pour un ou plusieurs fichiers
sur votre projet. Elle peut être installé sur votre projet en tant que dépendance
de développement, ou globalement. Enfin, elle peut être configurée à volonté, y compris
en utilisant des générateurs de tests personnalisés.

## Démarrage rapide

Installation rapide de l'outil dans un projet :

```bash
composer require --dev phpunitgen/console
```

Copie de la configuration par défaut :

```bash
cp ./vendor/phpunitgen/console/config/phpunitgen.php ./phpunitgen.php
```

Lancement de l'outil :

```bash
./vendor/bin/phpunitgen src/MyClass.php
```

## Installation

### Prérequis

En fonction de votre version de PHP (et de Laravel, si vous souhaitez utiliser
[l'intégration à Laravel](/fr/command-line.md#intégration-à-laravel)),
la version de PhpUnitGen à utiliser ne sera pas la même.

| PHP                  | Laravel                           | PhpUnitGen | Support   |
|----------------------|-----------------------------------|------------|-----------|
| `8.1` et supérieure  | `^9.0` et supérieure              | `v6`       | Active    |
| `8.0` et supérieure  | `^9.0` et supérieure              | `v5`       | Dépréciée |
| `8.0` et supérieure  | `^9.0`                            | `v4`       | Dépréciée |
| `8.0` ou `8.1`       | `^9.0`                            | `v3`       | Dépréciée |
| `8.0` ou `8.1`       | `^7.0`  ou `^8.0`                 | `v2`       | Dépréciée |
| `7.1`  et supérieure | `^5.8`, `^6.0`, `^7.0`  ou `^8.0` | `v1`       | Dépréciée |

> Uniquement la dernière version de PhpUnitGen dispose d'un support actif.

### Installation sur un projet

Ce mode d'installation est recommandé, car il vous permet d'utiliser
l'intégration à Laravel.

```bash
composer require --dev phpunitgen/console
```

Ensuite, vous pouvez appeler l'outil depuis la racine de votre projet :

```bash
./vendor/bin/phpunitgen path/to/File.php
```

### Installation globale

Ce mode d'installation vous permet d'utiliser globalement PhpUnitGen.
Pour cela, vous devrez au préalable avoir les éxécutables de Composer dans votre `PATH`.

```bash
composer global require --dev phpunitgen/console
```

Ensuite, vous pouvez appeler l'outil depuis n'importe quel répertoire :

```bash
phpunitgen path/to/File.php
```

## Utilisation

Peu importe le mode d'utilisation de la ligne de commande (globale, projet ou Laravel), PhpUnitGen
vous proposera les mêmes arguments et options.

Lorsqu'il s'exécute, il vous donne des informations sur le nombre de fichiers traités, en warning
ou en erreur, ainsi que la durée d'exécution ou l'utilisation mémoire.
Vous pouvez augmenter la verbosité (en utilisant les options `-v`, `-vv` ou `-vvv`) pour afficher
plus de détails sur les erreurs ou les warnings.

Vous pouvez appeler PhpUnitGen sur un fichier ou un dossier. Si vous utilisez PhpUnitGen
sur un dossier, l'outil analysera et générera un fichier pour chaque fichier du dossier,
de manière récursive. Vous pouvez également préciser le dossier dans lequel
les tests seront générés. Voici quelques exemples :

```bash
# Génére les tests du fichier File.php dans tests/my/FileTest.php.
phpunitgen app/my/File.php

# Génére les tests des fichiers de app/my dans tests/my.
phpunitgen app/my

# Génére les tests du fichier File.php dans custom/target/FileTest.php
phpunitgen app/my/File.php custom/target

# Génére les tests des fichiers de app/my dans custom/target.
phpunitgen app/my custom/target
```

> La ligne de commande de PhpUnitGen retourne `1` si une erreur critique s'est produite
> (configuration invalide par exemple), `100` si une/plusieurs erreurs se sont produites sur
> certains fichiers, `101` si un/plusieurs avertissements se sont produits sur
> certains fichiers, `0` si aucun avertissement/erreur ne s'est produit.

### Chemin de configuration personnalisé

Vous pouvez également fournir un chemin vers le fichier de configuration à utiliser :

```bash
phpunitgen --config path/to/config.php
# ou
phpunitgen -C path/to/config.php
```

### Écraser les fichiers

Enfin, vous pouvez indiquer à PhpUnitGen d'écraser les fichiers existants par les nouveaux tests :

```bash
phpunitgen --overwrite
# ou
phpunitgen -O
```

> Sachez que l'option `--overwrite` ignore la valeur de ce paramètre dans le fichier de configuration.
> Cela vous permet d'exceptionnelement choisir d'écraser un/plusieurs fichier(s).

### Sortie JSON

Par défaut, PhpUnitGen affiche une progression et un résumé textuel.
Vous pouvez choisir d'afficher un rapport au format JSON avec l'option `json`.

```bash
phpunitgen --json
```

Voici un exemple de rapport JSON :

```json
{
  "summary": {
    "sources": 3,
    "successes": 1,
    "warnings": 1,
    "errors": 1,
    // Durée d'exécution en millisecondes.
    "time": 3500,
    // Mémoire utilisée en octets.
    "memory": 78643200
  },
  // "Map" entre une source et un objet de résultat.
  "results": {
    "path/to/Foo.php": {
      "status": "success",
      "path": "path/to/FooTest.php",
      "message": "Successful generation"
    },
    "path/to/Bar.php": {
      "status": "warning",
      "message": "A warning message"
    },
    "path/to/Baz.php": {
      "status": "error",
      "message": "An exception message"
    }
  }
}
```

## Intégration à Laravel

PhpUnitGen s'intègre automatiquement à tous les projets Laravel `5.8` et supérieur lorsqu'il est installé
en dépendance du projet.

Si jamais vous avez désactivé la découverte des paquets via Laravel, il vous suffit d'ajouter le
`provider` de PhpUnitGen à votre fichier de configuration `app.php` :

```php
// config/app.php
'providers' => [
    ...
    \PhpUnitGen\Console\Adapters\Laravel\PhpUnitGenServiceProvider::class,
    ...
],
```

Vous pouvez alors l'appeler via Artisan :

```bash
php artisan phpunitgen app/User.php
```

Par ailleurs, PhpUnitGen va automatiquement écouter l'appel de la commande `php artisan make`, de
façon à générer un test unitaire pour chaque nouveau fichier généré. Voici un exemple :

```
php artisan make:policy UserPolicy

# Cette commande crée d'abord un fichier app/Policies/UserPolicy
# PhpUnitGen détecte l'appel, et génère un fichier tests/Unit/Policies/UserPolicyTest
```

Vous pouvez désactiver cette exécution automatique de PhpUnitGen dans le fichier de configuration,
en utilisant le paramètre `generateOnMake`.

Il est aussi possible de générer le fichier de configuration par défaut à la racine du projet,
en utilisant la commande suivante :

```
php artisan vendor:publish --tag=phpunitgen-config
```

### Laravel Lumen

PhpUnitGen est normalement compatible avec Laravel Lumen `5.8` et supérieur, mais cela n'est pas testé.

Pour activer l'intégration avec Laravel Lumen, vous devrez ajouter la ligne suivante dans votre
fichier `bootstrap/app.php` après les autres appels à `$app->register()` :

```php
// bootstrap/app.php

// $app->register(App\Providers\AppServiceProvider::class);
// ...
$app->register(PhpUnitGen\Console\Adapters\Laravel\PhpUnitGenServiceProvider::class);
```

## Configuration

### Fichier de configuration

Vous pouvez déclarer un fichier de configuration pour PhpUnitGen, mais ce n'est pas obligatoire.

Afin de faciliter l'utilisation, PhpUnitGen accepte différents formats/noms de fichier de
configuration.

Le fichier de configuration peut être au format `PHP`, `YAML` ou `JSON`.

Si vous ne préciser pas l'option `--config`, PhpUnitGen analysera le dossier courant pour
trouver votre fichier de configuration. Il essaiera les noms suivants, dans cet ordre précis :

- `phpunitgen.php`
- `phpunitgen.php.dist`
- `phpunitgen.yml`
- `phpunitgen.yml.dist`
- `phpunitgen.json`
- `phpunitgen.json.dist`

Si aucun de ces fichiers n'existe, PhpUnitGen utilisera la configuration par défaut.

Si vous fournissez l'option `--config` avec un chemin correct, PhpUnitGen détectera
la manière dont il doit importer cette configuration en analysant l'extension du fichier.

Vous pouvez trouver des fichiers de [configuration d'exemples
ici](https://github.com/paul-thebaud/phpunitgen-console/tree/main/config).

### Paramètres de la configuration

Vous pouvez voir tous les paramètres de configuration sur la [page dédiée](/fr/configuration.md),
mais voici les paramètres propres à la ligne de commande.

#### Ré-écriture des fichiers

* **Clé du paramètre** : `overwriteFiles`
* **Type** : `boolean`
* **Valeur par défaut**: `false`
* **Description** : Indique à PhpUnitGen s'il doit remplacer les fichiers existants par
  les nouveaux tests générés ou pas.

#### Backup des fichiers

* **Clé du paramètre** : `backupFiles`
* **Type** : `boolean`
* **Valeur par défaut**: `true`
* **Description** : Indique à PhpUnitGen s'il doit sauvegarder les fichiers existants qui vont
  être écrasé (disponible si la ré-écriture est active).

#### Fichiers exclus

* **Clé du paramètre** : `excludedFiles`
* **Type** : `string[]`
* **Valeur par défaut**: `[ ]`
* **Description** : Indique les expressions régulières auxquelles les fichiers (pour lesquels des tests
  seront générés) ne DOIVENT pas correspondre.

#### Fichiers inclus

* **Clé du paramètre** : `includedFiles`
* **Type** : `string[]`
* **Valeur par défaut**: `[ "\.php$" ]`
* **Description** : Indique les expressions régulières auxquelles les fichiers (pour lesquels des tests
  seront générés) DOIVENT correspondre.

#### Génération à l'appel de `php artisan make:...`

* **Clé du paramètre** : `generateOnMake`
* **Type** : `boolean`
* **Valeur par défaut**: `true`
* **Description** : Indique à PhpUnitGen s'il doit s'éxécuter à chaque appel de la commande
  `php artisan make:...`. Ce paramètre est propre
  à [l'intégration à Laravel](/fr/command-line.md#intégration-à-laravel).

# Ligne de commande

La ligne de commande vous permet de générer des tests pour un ou plusieurs fichiers
sur votre projet. Elle peut être installé sur votre projet en tant que dépendance
de développement, ou globalement. Enfin, elle peut être configurée à volonté, y compris
en utilisant des générateurs de tests personnalisés.

## Installation

**Exigences pour installer l'outil**

Si vous utilisez l'outil en ligne de commande ou le cœur, vous devez satisfaire
les exigences suivantes :

- PHP `7.2` et supérieur.
- Laravel `5.7` et supérieur si vous souhaitez utilisez
[l'intégration à Laravel](/fr/command-line.md#intégration-à-laravel).

**Installation sur un projet**

Ce mode d'installation est recommandé, car il vous permet d'utiliser
l'intégration à Laravel.

```bash
composer require --dev phpunitgen/console
```

Ensuite, vous pouvez appeler l'outil depuis la racine de votre projet :

```bash
./vendor/bin/phpunitgen path/to/File.php
```

**Installation globale**

Ce mode d'installation vous permet d'utiliser globalement PhpUnitGen.
Pour cela, vous devrez au préalable avoir [ajouter les dépendances composer globales à
votre path](https://example.com).

```bash
$ composer global require --dev phpunitgen/console
```

Ensuite, vous pouvez appeler l'outil depuis n'importe quel répertoire :

```bash
$ phpunitgen path/to/File.php
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
ici](https://github.com/paul-thebaud/phpunitgen-console/tree/master/config).

### Paramètres de la configuration

Vous pouvez voir tous les paramètres de configuration sur la [page dédiée](/fr/configuration.md),
mais voici les paramètres propres à la ligne de commande.

#### Ré-écriture des fichiers

* **Clé du paramètre** : `overwriteFiles`
* **Type** : `booléen`
* **Valeur par défaut**: `false`
* **Description** : Indique à PhpUnitGen que s'il doit remplacer les fichiers existants par
les nouveaux tests générés ou pas.

#### Fichiers exclus

* **Clé du paramètre** : `excludedFiles`
* **Type** : `tableau de chaînes de caractères`
* **Valeur par défaut**: `[ ]`
* **Description** : Indique les expressions régulières auxquelles les fichiers (pour lesquels des tests
seront générés) ne DOIVENT pas correspondre.

#### Fichiers inclus

* **Clé du paramètre** : `includedFiles`
* **Type** : `tableau de chaînes de caractères`
* **Valeur par défaut**: `[ "\.php$" ]`
* **Description** : Indique les expressions régulières auxquelles les fichiers (pour lesquels des tests
seront générés) DOIVENT correspondre.

#### Génération à l'appel de `php artisan make:...`

* **Clé du paramètre** : `generateOnMake`
* **Type** : `booléen`
* **Valeur par défaut**: `true`
* **Description** : Indique à PhpUnitGen s'il doit s'éxécuter à chaque appel de la commande
`php artisan make:...`. Ce paramètre est propre à l'intégration à Laravel.

## Utilisation

Peu importe le mode d'utilisation de la ligne de commande (globale, projet ou Laravel), PhpUnitGen
vous proposera les mêmes arguments et options.

Vous pouvez appeler PhpUnitGen sur un fichier ou un dossier. Si vous utilisez PhpUnitGen
sur un dossier, l'outil analysera et générera un fichier pour chaque fichier du dossier,
de manière récursive. Vous pouvez également préciser ou un fichier dans lequel
les tests seront générés. Voici quelques exemples :

```bash
# Génére les tests du fichier File.php dans tests/my/File.php.
phpunitgen app/my/File.php

# Génére les tests des fichiers de app/my dans tests/my.
phpunitgen app/my

# Génére les tests du fichier File.php dans custom/target/File.php.
phpunitgen app/my/File.php custom/target

# Génére les tests des fichiers de app/my dans custom/target.
phpunitgen app/my custom/target
```

!> Notez que si vous fournissez un dossier comme source à PhpUnitGen, la cible fournit doit
être omise ou correspondre à un dossier.

Vous pouvez également fournir un chemin vers le fichier de configuration à utiliser :

```bash
phpunitgen --config path/to/config.php
# ou
phpunitgen -C path/to/config.php
```

Enfin, vous pouvez indiquer à PhpUnitGen d'écraser les fichiers existants par les nouveaux tests :

```bash
phpunitgen --overwrite
# ou
phpunitgen -O
```

> Sachez que l'option `--overwrite` la valeur de ce paramètre dans le fichier de configuration.
> Cela vous permet d'exceptionnelement choisir d'écraser un/plusieurs fichier(s).

## Intégration à Laravel

PhpUnitGen s'intègre automatiquement à tous les projets Laravel `5.7` et plus lorsqu'il est installé
en dépendence du projet.

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

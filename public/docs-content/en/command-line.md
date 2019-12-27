# Command line interface

The command line interface (CLI) allows you to generate tests for one or more files
on your project. It can be installed on your project as a development dependency or globally.
Finally, it can be fully configured, including using custom tests/mocks generators.

## Getting started

Quick installation of the tool in a project:

```bash
composer require --dev phpunitgen/console
```

Copying the default configuration:

```bash
cp ./vendor/phpunitgen/console/config/phpunitgen.php ./phpunitgen.php
```

Launching the tool:

```bash
./vendor/bin/phpunitgen src/MyClass.php
```

## Installation

**Requirements**

If you use the command line tool or the core, you must satisfy
the following requirements:

- PHP `7.2` and up.
- Laravel `5.7` and up if you want to use
[the integration with Laravel](/en/command-line.md#integration-with-laravel).

**Installation inside a project**

This installation mode is recommended, as it allows you to use
integration with Laravel.

```bash
composer require --dev phpunitgen/console
```

Then you can call the tool from the root of your project:

```bash
./vendor/bin/phpunitgen path/to/File.php
```

**Global installation**

This installation mode allows you to use PhpUnitGen globally.
To do this, you will need to have the Composer executables in your `PATH`.

```bash
composer global require --dev phpunitgen/console
```

Then you can call the tool from any directory:

```bash
phpunitgen path/to/File.php
```

## Configuration

### Configuration file

You can declare a configuration file for PhpUnitGen, but it is not required.

For ease of use, PhpUnitGen accepts different formats/filenames of
configuration.

The configuration file can be in `PHP`, `YAML` or `JSON`.

If you do not specify the `--config` option, PhpUnitGen will scan the current directory to
find your configuration file. It will try the following names, in that order:

- `phpunitgen.php`
- `phpunitgen.php.dist`
- `phpunitgen.yml`
- `phpunitgen.yml.dist`
- `phpunitgen.json`
- `phpunitgen.json.dist`

If none of these files exist, PhpUnitGen will use the default configuration.

If you provide the `--config` option with a correct path, PhpUnitGen will detect
how it should import this configuration by parsing the file extension.

You can find [example configuration files
here](https://github.com/paul-thebaud/phpunitgen-console/tree/master/config).

### Configuration parameters

You can see all the configuration parameters on the [dedicated page](/en/configuration.md),
but here are the CLI parameters.

#### Files overwriting

* **Parameter key** : `overwriteFiles`
* **Type** : `boolean`
* **Default value**: `false`
* **Description** : Defines if PhpUnitGen should replace existing files with
new generated tests or not.

#### Excluded files

* **Parameter key** : `excludedFiles`
* **Type** : `string[]`
* **Default value**: `[ ]`
* **Description** : Specifies the regular expressions to which the files (for which tests
will be generated) MUST not match.

#### Fichiers inclus

* **Parameter key** : `includedFiles`
* **Type** : `string[]`
* **Default value**: `[ "\.php$" ]`
* **Description** : Specifies the regular expressions to which the files (for which tests
will be generated) MUST match.

#### Generation on a `php artisan make:...` call.

* **Parameter key** : `generateOnMake`
* **Type** : `boolean`
* **Default value**: `true`
* **Description** : Defines if PhpUnitGen should execute on each `php artisan make:...`
calls. This parameter is proper to [the integration with Laravel](/en/command-line.md#integration-with-laravel).

## Utilisation

Regardless of the command line usage mode (global, project or Laravel), PhpUnitGen
will offer you the same arguments and options.

Lorsqu'il s'exécute, il vous donne des informations sur le nombre de fichiers traités, en warning
ou en erreur, ainsi que la durée d'exécution ou l'utilisation mémoire.
Vous pouvez augmenter la verbosité (en utilisant les options `-v`, `-vv` ou `-vvv`) pour afficher
plus de détails sur les erreurs ou les warnings.

Vous pouvez appeler PhpUnitGen sur un fichier ou un dossier. Si vous utilisez PhpUnitGen
sur un dossier, l'outil analysera et générera un fichier pour chaque fichier du dossier,
de manière récursive. Vous pouvez également préciser ou un fichier dans lequel
les tests seront générés. Voici quelques exemples :

```bash
# Génére les tests du fichier File.php dans tests/my/File.php.
phpunitgen app/my/File.php

# Génére les tests des fichiers de app/my dans tests/my.
phpunitgen app/my

# Génére les tests du fichier File.php dans custom/Target.php.
phpunitgen app/my/File.php custom/Target.php

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

## Integration with Laravel

PhpUnitGen s'intègre automatiquement à tous les projets Laravel `5.7` et plus lorsqu'il est installé
en dépendance du projet.

Si jamais vous avez désactivé la découverte des paquets via Laravel, il vous suffit d'ajouter le
`provider` de PhpUnitGen à votre fichier de configuration de l'application :

```php
// config/app.php
'providers' => [
    ...
    \PhpUnitGen\Console\Container\ConsoleServiceProvider::class,
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

Il est aussi possible de générer le fichier de configuration par défaut à la racine du projet,
en utilisant la commande suivante :

```
php artisan vendor:publish --tag=phpunitgen-config
```

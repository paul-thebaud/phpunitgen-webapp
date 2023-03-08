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

### Requirements

Depending on your PHP version (and Laravel's one, if you want to use
[the integration with Laravel](/en/command-line.md#integration-with-laravel)),
the PhpUnitGen's version to use won't be the same.

| PHP            | Laravel                           | PhpUnitGen | Support    |
|----------------|-----------------------------------|------------|------------|
| `8.0` and up   | `^9.0` and up                     | `v5`       | Active     |
| `8.0` and up   | `^9.0`                            | `v4`       | Deprecated |
| `8.0` or `8.1` | `^9.0`                            | `v3`       | Deprecated |
| `8.0` or `8.1` | `^7.0`  or `^8.0`                 | `v2`       | Deprecated |
| `7.1` and up   | `^5.8`, `^6.0`, `^7.0`  or `^8.0` | `v1`       | Deprecated |

> Only the latest PhpUnitGen version gets active support.

### Installation inside a project

This installation mode is recommended, as it allows you to use
integration with Laravel.

```bash
composer require --dev phpunitgen/console
```

Then you can call the tool from the root of your project:

```bash
./vendor/bin/phpunitgen path/to/File.php
```

### Global installation

This installation mode allows you to use PhpUnitGen globally.
To do this, you will need to have the Composer executables in your `PATH`.

```bash
composer global require --dev phpunitgen/console
```

Then you can call the tool from any directory:

```bash
phpunitgen path/to/File.php
```

## Usage

Regardless of the command line usage mode (global, project or Laravel), PhpUnitGen
will offer you the same arguments and options.

When it runs, it gives you information on the number of files processed, warned
or errored, as well as runtime or memory usage.
You can increase verbosity (using the `-v`, `-vv` or `-vvv` options) to display
more details on errors and warnings.

You can call PhpUnitGen on a file or a folder. If you use PhpUnitGen
on a folder, the tool will analyze and generate a file for each file in the folder,
recursively. You can also specify a file or a folder in which
the tests will be generated. Here are a few examples:

```bash
# Generates the tests of the File.php file in tests/my/FileTest.php.
phpunitgen app/my/File.php

# Generates tests of app/my files in tests/my.
phpunitgen app/my

# Generates the tests of the File.php file in custom/target/FileTest.php.
phpunitgen app/my/File.php custom/target

# Generates tests of app/my files in custom/target.
phpunitgen app/my custom/target
```

> The PhpUnitGen command line returns `1` if a critical error has occurred
> (e.g., invalid configuration), `100` if one or more errors occurred on
> some files, `101` if one or more warnings occurred on
> some files, `0` if no warning/error occurred.

### Custom configuration path

You can also provide a path to the configuration file to use:

```bash
phpunitgen --config path/to/config.php
# or
phpunitgen -C path/to/config.php
```

### Overwriting files

You can tell PhpUnitGen to overwrite existing files with the new ones:

```bash
phpunitgen --overwrite
# or
phpunitgen -O
```

> Note that the `--overwrite` option will ignore the value of this parameter in the configuration file.
> This allows you to exceptionally choose to overwrite one or more files.

### JSON output

By default, PhpUnitGen will output a text progress and summary when executing.
You may output a JSON report using the `json` option.

```bash
phpunitgen --json
```

Here is an example of a JSON report:

```json
{
  "summary": {
    "sources": 3,
    "successes": 1,
    "warnings": 1,
    "errors": 1,
    // Execution time in milliseconds.
    "time": 3500,
    // Used memory in bytes.
    "memory": 78643200
  },
  // Map between a source absolute path and a result object.
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

## Integration with Laravel

PhpUnitGen integrates automatically to all Laravel `5.8` and up projects when installed
as a composer dependency on the project.

If you ever disabled package discovery via Laravel, just add the PhpUnitGen `provider` to your
`app.php` config file:

```php
// config/app.php
'providers' => [
    ...
    \PhpUnitGen\Console\Adapters\Laravel\PhpUnitGenServiceProvider::class,
    ...
],
```

You can then call him via Artisan:

```bash
php artisan phpunitgen app/User.php
```

In addition, PhpUnitGen will automatically listen to the `php artisan make` command call,
in order to generate a unit test for each new file generated. Here is an example:

```
php artisan make:policy UserPolicy

# This command first creates a file app/Policies/UserPolicy
# PhpUnitGen detects the call, and generates a tests/Unit/Policies/UserPolicyTest file.
```

You can disable this automatic execution of PhpUnitGen in the configuration file, using the
`generateOnMake` parameter.

It is also possible to generate the default configuration file at the root of the project,
using the following command:

```
php artisan vendor:publish --tag=phpunitgen-config
```

### Laravel Lumen

PhpUnitGen is normally compatible with Laravel Lumen `5.8` and higher, but this is not tested.

To enable integration with Laravel Lumen, you will need to add the following line to your
`bootstrap/app.php` file after the other calls to `$app->register()`:

```php
// bootstrap/app.php

// $app->register(App\Providers\AppServiceProvider::class);
// ...
$app->register(PhpUnitGen\Console\Adapters\Laravel\PhpUnitGenServiceProvider::class);
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
here](https://github.com/paul-thebaud/phpunitgen-console/tree/main/config).

### Configuration parameters

You can see all the configuration parameters on the [dedicated page](/en/configuration.md),
but here are the CLI parameters.

#### Files overwriting

* **Parameter key** : `overwriteFiles`
* **Type** : `boolean`
* **Default value**: `false`
* **Description** : Defines if PhpUnitGen should replace existing files with
  new generated tests or not.

#### Files backup

* **Parameter key** : `backupFiles`
* **Type** : `boolean`
* **Default value**: `true`
* **Description** : Defines if PhpUnitGen should save existing file which will
  be overwritten (available if overwriting is enabled).

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

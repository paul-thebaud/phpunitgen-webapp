# Console Toolkit

## Installation

The tool can be installed on your project using [composer](https://getcomposer.org).

```bash
$ composer require --dev phpunitgen/console
```

You can also install globally using the following command, to use it on every projects
on you are working on using the global command.

```bash
$ composer global require phpunitgen/console
```

When using this installation method, you should add the `~/.composer/vendor/bin`
to your path. This will give you the access everywhere on your computer.

## Laravel `make` binding

When working on a Laravel project, PhpUnitGen will (as a default behavior)
listen for the `php artisan make:...` command and try to generate immediately
the associated test in the right directory.

This feature have been tested on Laravel `5.8` and up.

!> If you installed the package globally (second installation option), PhpUnitGen
service provider will not be detected by Laravel and you wont get the event binding.

## Simple Usage

To use PhpUnitGen, you just have to call its `bin` file with the directory/file
you want to generate tests for.

For example, if you have an `app/` directory containing your source code,
you can use the following command:

```bash
$ ./vendor/bin/phpunitgen app
```

This will analyse the whole content of directory and generate tests for each
files in the `tests` directory.

!> PhpUnitGen must be called from your project root.

## Configuration



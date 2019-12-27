# Configuration

The configuration of PhpUnitGen is the same on the web application or the command
line, because it is integrated into the heart of the tool.

It allows you to customize the generation of your tests, via different parameters.

If you think a configuration option is missing, please feel free to suggest it to us.

> The default configuration of PhpUnitGen corresponds to the following Laravel project
> framework conventions. Of course, you can configure according to your needs.

!> The command line tool has some additional options due to
to its operation, you can see them [here](/en/command-line.md#configuration).

## Configuration parameters

Here is a list of PhpUnitGen configuration parameters. Regardless of the interface
you use, you will find each of these configuration keys.

If a configuration key is not specified, the default value will be used.
[See the default configuration](https://github.com/paul-thebaud/phpunitgen-core/blob/master/config/phpunitgen.php).

### Automatic generation

* **Parameter Key** : `automaticGeneration`
* **Type** : `boolean`
* **Default value**: `true`
* **Description** : Defines whether the generator should attempt to generate advanced properties and tests
or just empty methods to fill in.

### Implementations to use

* **Parameter Key** : `implementations`
* **Type** : `string[]` (with `string` keys)
* **Default value**: delegated test generator and mock generator for Mockery.
* **Description** : Defines the implementations to be used for all PhpUnitGen steps.

If you want to use the default configuration, just use the following value:

```php
use PhpUnitGen\Core\Generators\Tests\DelegateTestGenerator;

return [
    'implementations' => DelegateTestGenerator::implementations(),
];
```

Each test generator has a static `implementations()` method that returns an array of implementations to use.

So you can use this method for any generator you want to use:

```php
use PhpUnitGen\Core\Generators\Tests\Laravel\Command\CommandTestGenerator;

return [
    'implementations' => CommandTestGenerator::implementations(),
];
```

You can also choose to override certain implementations, using `array_merge`:

```php
use PhpUnitGen\Core\Contracts\Generators\MockGenerator;
use PhpUnitGen\Core\Generators\Tests\Laravel\Command\CommandTestGenerator;
use PhpUnitGen\Core\Generators\Mocks\PhpUnitMockGenerator;

return [
    'implementations' => array_merge(CommandTestGenerator::implementations(), [
        MockGenerator::class => PhpUnitMockGenerator::class,
    ]),
];
```

> If you want to learn more about the different tests/mocks generators available, you can
> go to the [configuration page](https://phpunitgen.io/configuration) of the web
> application, on which each of the generators is described by a tooltip.

!> On the web version, it is only possible to choose the implementation of the test generator
or the mock generator.

!> Be aware that when you configure implementations, you may only provide certain implementations,
and PhpUnitGen will fill the others with default values. Only the test generator is required.

### Base namespace

* **Parameter Key** : `baseNamespace`
* **Type** : `string`
* **Default value**: `"App"`
* **Description** : Defines the base namespace of your source code. It will be replaced by the
test base namespace.

### Test base namespace

* **Parameter Key** : `baseTestNamespace`
* **Type** : `string`
* **Default value**: `"Tests"`
* **Description** : Defines the base namespace for your tests. It replaces your base namespace.

### "TestCase" class to extends

* **Parameter Key** : `testCase`
* **Type** : `string`
* **Default value**: `"Tests\\TestCase"`
* **Description** : Defines the absolute name of the "TestCase" class to be extended in the test.

### Methods to be excluded from generation

* **Parameter Key** : `excludedMethods`
* **Type** : `string[]`
* **Default value**: `[ "__construct", "__destruct" ]`
* **Description** : Defines the methods for which no test skeletons should be generated. Can be
formatted as a regular expression ("__.*" for example to exclude magic methods).

### PHPDoc annotations to keep

* **Parameter Key** : `mergedPhpDoc`
* **Type** : `string[]`
* **Default value**: `[ "author", "copyright", "license", "version" ]`
* **Description** : Defines the PHPDoc annotations that must be retrieved from the class to be tested and reinjected.
in the test class ("license" for example).

### Annotation PHPDoc à ajouter

* **Parameter Key** : `phpDoc`
* **Type** : `string[]`
* **Default value**: `[ ]`
* **Description** : Defines the PHPDoc annotations that should be added to the test class.
(e.g. "@author John Doe").

### Options

* **Parameter Key** : `options`
* **Type** : `mixed[]` (with `string` keys)
* **Description** : Defines the options to be used, which are specific to one/many
tests generator(s).

> Each option is directly available on the web application.
> as an individual configuration parameter, for easier customization.

#### List of available options

* **Option key** : `context`
* **Type** : `string|null`
* **Default value**: `"laravel"`
* **Description** : Defines the context of your project. Used by the delegated generator
to choose the most suitable generator for your type of project.
For the moment, two values are possible: `"laravel"`, and `null` (for all other projects).


* **Option key** : `laravel.user`
* **Type** : `string`
* **Default value**: `"App\\User"`
* **Description** : Defines the class of the Eloquent User model for a project within the "Laravel"
context. Used by several Laravel's generators in order to correctly import
the User class when it is needed in tests (for example to test a Policy).

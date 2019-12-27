# Web application & API

## Web application

The web interface is the easiest way to use PhpUnitGen. It allows you to
to try the tool, to see if it meets your needs.

The configuration and customization are quite advanced, but not as much as for
the command line or the core of the tool. Indeed, you cannot override
as the test generator or mocks, and you can't add your own.

## Getting started

To get started with the web interface, just go to the [https://phpunitgen.io/tool](/tool) page.
and paste/enter your code in the "Editor" tab (or left editor, if you are on a wide screen).
You can then click on the "Generate" button to generate your tests.

## API

The API is currently used by the web application to retrieve the list of generators of
available tests/mocks, and generate the tests.

You can use this API freely and for free.

> Be aware that the HTTP header `Accept-Language` allows you to set the language in which
> generator names and descriptions will be provided. For the time being, English
> and French are supported, with English as the default language.

!> The API exchanges JSON data. You must therefore provide the HTTP headers
`Accept: application/json` and `Content-Type: application/json` to get answers
in the correct format.

### Version

The PhpUnitGen API is versioned, in case any breaking changes that create incompatibilities are made.

The main entry point to the API, [`https://phpunitgen.io/api/v1`](https://phpunitgen.io/api/v1), returns you the
of the PhpUnitGen core's version. Here is an example of a return `GET' call on this URL:

```json
{
  "coreVersion": "1.0.0",
  "apiVersion": "v1"
}
```

### Tests generators

The tests generators are the tools within PhpUnitGen that will allow you to
define how a test should be generated for a certain code.

#### Entry point

```
 GET    https://phpunitgen.io/api/v1/test-generators
 GET    https://phpunitgen.io/api/v1/test-generators/:id
```

#### The tests generator object

* **id** `[string]`: a unique identifier for this generator.
* **name** `[string]`: the name of the generator, translated into the language of the header `Accept-Language`.
* **description** `[string]`: the description of the generator, translated into the language of the header `Accept-Language`.
* **class** `[string]`: the class corresponding to this generator on the PhpUnitGen core.
* **example** `[string]`: an example of a PHP class on which this generator works well.
* **author** `[object]`
    * **name** `[string]`: the name or pseudonym of the creator of this generator.
    * **website** `[string]`: the website/GitHub of the creator of this generator.

```json
{
  "id": "delegate",
  "name": "Delegate",
  "description": "This generator is dedicated to [...]",
  "class": "PhpUnitGen\\Core\\Generators\\Tests\\DelegateTestGenerator",
  "example": "<?php /* An example code for this type of test generator */",
  "author": {
    "name": "Paul Thébaud",
    "website": "https://github.com/paul-thebaud"
  }
}
```

#### Retrieving a tests generator

```
 GET    https://phpunitgen.io/api/v1/test-generators/:id
```

**Arguments**

* **`id`**: a correct tests generator identifier.

**Response**

Returns a "tests generator" object if the identifier is correct with a
`HTTP 200` status code. Otherwise, return a `HTTP 404` status code.

#### Retrieving the list of all tests generators

```
 GET    https://phpunitgen.io/api/v1/test-generators
```

**Response**

Returns an array of "tests generator" objects with a `HTTP 200` status code.

### Mocks generators

The mock generators are the tools that, within PhpUnitGen, will allow you to
define how the code of a mock should be generated. For example, if a mock for a `LogService` mock
must be created, the code for `PHPUnit` will be `$this->getMock(LogService::class)`, whereas
for `Mockery`, it will be `Mockery::mock(LogService::class)`.

#### Entry point

```
 GET    https://phpunitgen.io/api/v1/mock-generators
 GET    https://phpunitgen.io/api/v1/mock-generators/:id
```

#### The mocks generators object

* **id** `[string]`: a unique identifier for this generator.
* **name** `[string]`: the name of the generator, translated into the language of the header `Accept-Language`.
* **description** `[string]`: the description of the generator, translated into the language of the header `Accept-Language`.
* **class** `[string]`: the class corresponding to this generator on the PhpUnitGen core.
* **website** `[string]`: the website of the "mocking" library to which this generator is dedicated.
* **author** `[object]`
    * **name** `[string]`: the name or pseudonym of the creator of this generator.
    * **website** `[string]`: the website/GitHub of the creator of this generator.

```json
{
  "id": "mockery",
  "name": "Mockery",
  "description": "This generator is dedicated to [...]",
  "class": "PhpUnitGen\\Core\\Generators\\Mocks\\MockeryMockGenerator",
  "website": "http://docs.mockery.io/",
  "author": {
    "name": "Paul Thébaud",
    "website": "https://github.com/paul-thebaud"
  }
}
```

#### Retrieving a mocks generator

```
 GET    https://phpunitgen.io/api/v1/mock-generators/:id
```

**Arguments**

* **`id`**: a correct mocks generator identifier.

**Response**

Returns a "mocks generator" object if the identifier is correct with a
`HTTP 200` status code. Otherwise, return a `HTTP 404` status code.

#### Retrieving the list of all mocks generators

```
 GET    https://phpunitgen.io/api/v1/mock-generators
```

**Response**

Returns an array of "mocks generator" objects with a `HTTP 200` status code.

### Tests

Tests are the objects that PhpUnitGen aims to generate.

#### Entry point

```
POST    https://phpunitgen.io/api/v1/tests
```

#### The test object

* **name** `[string]`: the name of the generated class.
* **code** `[string]`: the complete PHP code of the generated class.
* **executionTime** `[float]`: the time it took PhpUnitGen to generate this test, in seconds.

```json
{
  "name": "PersonTest",
  "code": "<?php [...] class PersonTest { [...] }",
  "executionTime": 0.057
}
```

#### Creating a test

```
POST    https://phpunitgen.io/api/v1/tests
```

**Arguments**

These arguments must be provided as request payload in `application/json` format.

* **code** `[string]`: the PHP code for which to generate a test.
* **config** `[object]`: the configuration used to generate the test. See the [configuration
page](/en/configuration.md) for more details on each parameter of this object.

Here is an example of the payload of a request:

```json
{
 "code": "<?php [...The PHP code for which to generate a test...]",
 "config": {
   "automaticGeneration": true,
   "testGenerator": "delegate",
   "mockGenerator": "mockery",
   "baseNamespace": "App",
   "baseTestNamespace": "Tests",
   "testCase": "Tests\\TestCase",
   "excludedMethods": [
     "__construct",
     "__destruct"
   ],
   "mergedPhpDoc": [
     "author",
     "copyright",
     "license",
     "version"
   ],
   "phpDoc": [],
   "options": {
     "context": "laravel",
     "laravel.user": "App\\User"
   }
 }
}
```

**Response**

Returns a "test" object if the request has been correctly processed with a
`HTTP 200` status code.

Returns an error object with a `HTTP 422` status code if the provided parameters
are invalid (e.g. a boolean instead of an array).

Returns an error object with a `HTTP 400` status code if an error occurred
during the generation. This may be due to an error in your PHP code, but
also to an error in PhpUnitGen itself.

Feel free to submit a [GitHub issue
](https://github.com/paul-thebaud/phpunitgen-core/issues) if you have any questions.

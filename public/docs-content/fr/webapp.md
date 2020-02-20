# Application Web & API

## Application Web

L'interface web est la manière la plus simple d'utiliser PhpUnitGen. Elle vous permet donc
d'essayer l'outil, pour savoir s'il répond à vos besoins.

La configuration et personnalisation y sont assez poussées, mais pas autant que pour
la ligne de commande ou le coeur de l'outil. En effet, vous ne pouvez surcharger
que le générateur de tests ou de mocks, et il vous est impossible d'ajouter les votres.

> Sachez que lorsque vous évoluer sur l'interface web, votre code ou votre configuration ne sont
> jamais sauvegardés par le serveur.

## Démarrage rapide

Pour démarrer avec l'interface web, il vous suffit d'aller sur la page [https://phpunitgen.io/tool](/tool)
et de coller/saisir votre code dans l'onglet "Editeur".
Vous pouvez ensuite cliquer sur le bouton "Générer" pour générer vos tests.

## API

L'API est actuellement utilisée par l'application web pour récupérer la liste des générateurs de
tests/mocks disponibles, et générer les tests.

Vous pouvez utiliser cette API librement et gratuitement.

> Sachez que l'entête HTTP `Accept-Language` vous permet de définir la langue dans laquelle
> les noms et les descriptions des générateurs seront fournies. Pour l'instant, l'anglais
> et le français sont supportés, avec l'anglais comme langage par défaut.

!> L'API échange des données JSON. Vous devez donc fournir les headers HTTP
`Accept: application/json` et `Content-Type: application/json` pour obtenir des réponses
dans un format correct.

### Version

L'API de PhpUnitGen est versionnée, au cas où des changements créant des incompatibilités seraient
à effectuer.

Le point d'entrée principal de l'API, [`https://phpunitgen.io/api/v1`](https://phpunitgen.io/api/v1), vous retourne la version
du coeur de PhpUnitGen. Voici un exemple de retour d'un appel `GET` sur cette URL :

```json
{
  "coreVersion": "1.0.0",
  "apiVersion": "v1"
}
```

### Générateurs de tests

Les générateurs de tests sont les outils qui, au sein de PhpUnitGen, vont permettre de
définir comment un test doit être généré pour un certain code.

#### Point d'entrée

```
 GET    https://phpunitgen.io/api/v1/test-generators
 GET    https://phpunitgen.io/api/v1/test-generators/:id
```

#### L'objet générateur de tests

* **id** `[string]` : un identifieur unique pour ce générateur.
* **name** `[string]` : le nom du générateur, traduit dans la langue du header `Accept-Language`.
* **description** `[string]` : la description du générateur, traduit dans la langue du header `Accept-Language`.
* **class** `[string]` : la classe correspondant à ce générateur sur le coeur de PhpUnitGen.
* **example** `[string]` : un exemple de classe PHP sur lequel ce générateur fonctionne bien.
* **author** `[object]`
    * **name** `[string]` : le nom ou pseudonyme du créateur de ce générateur.
    * **website** `[string]` : le site we du créateur de ce générateur.

```json
{
  "id": "delegate",
  "name": "Délégué",
  "description": "Ce générateur est dédié à [...]",
  "class": "PhpUnitGen\\Core\\Generators\\Tests\\DelegateTestGenerator",
  "example": "<?php /* Un code d'exemple pour ce type de générateur de test */",
  "author": {
    "name": "Paul Thébaud",
    "website": "https://github.com/paul-thebaud"
  }
}
```

#### Récupération d'un générateur de tests

```
 GET    https://phpunitgen.io/api/v1/test-generators/:id
```

**Arguments**

* **`id`** : un identifiant de générateur de tests correct. 

**Réponse**

Retourne un objet "générateur de test" si l'identifiant est correcte avec un code
`HTTP 200`. Sinon, renvoie un code `HTTP 404`.

#### Récupération de la liste des générateurs de tests

```
 GET    https://phpunitgen.io/api/v1/test-generators
```

**Réponse**

Retourne un tableau d'objets "générateur de test".

### Générateurs de mocks

Les générateurs de mocks sont les outils qui, au sein de PhpUnitGen, vont permettre de
définir comment le code d'un mock doit être généré. Si par exemple un mock pour un `LogService`
doit être fait, le générateur pour `PHPUnit` sera `$this->getMock(LogService::class)`, alors que
pour `Mockery`, il sera `Mockery::mock(LogService::class)`.

#### Point d'entrée

```
 GET    https://phpunitgen.io/api/v1/mock-generators
 GET    https://phpunitgen.io/api/v1/mock-generators/:id
```

#### L'objet générateur de mocks

* **id** `[string]` : un identifieur unique pour ce générateur.
* **name** `[string]` : le nom du générateur, traduit dans la langue du header `Accept-Language`.
* **description** `[string]` : la description du générateur, traduit dans la langue du header `Accept-Language`.
* **class** `[string]` : la classe correspondant à ce générateur sur le coeur de PhpUnitGen.
* **website** `[string]` : le site web de la librairie de "mocking" à laquelle ce générateur est dédiée.
* **author** `[object]`
    * **name** `[string]` : le nom ou pseudonyme du créateur de ce générateur.
    * **website** `[string]` : le site web/GitHub du créateur de ce générateur.

```json
{
  "id": "mockery",
  "name": "Mockery",
  "description": "Ce générateur est dédié à [...]",
  "class": "PhpUnitGen\\Core\\Generators\\Mocks\\MockeryMockGenerator",
  "website": "http://docs.mockery.io/",
  "author": {
    "name": "Paul Thébaud",
    "website": "https://github.com/paul-thebaud"
  }
}
```

#### Récupération d'un générateur de mocks

```
 GET    https://phpunitgen.io/api/v1/mock-generators/:id
```

**Arguments**

* **`id`** : un identifiant de générateur de mocks correct. 

**Réponse**

Retourne un objet "générateur de mock" si l'identifiant est correcte avec un code
`HTTP 200`. Sinon, renvoie un code `HTTP 404`.

#### Récupération de la liste des générateurs de mocks

```
 GET    https://phpunitgen.io/api/v1/mock-generators
```

**Réponse**

Retourne un tableau d'objets "générateur de mock".

### Tests

Les tests sont les objets que PhpUnitGen a pour objectif de générer.

#### Point d'entrée

```
POST    https://phpunitgen.io/api/v1/tests
```

#### L'objet test

* **name** `[string]` : le nom de la classe généré.
* **code** `[string]` : le code PHP complet de la classe généré.
* **executionTime** `[float]` : le temps qu'il a fallu à PhpUnitGen pour générer ce test, en secondes.

```json
{
  "name": "PersonTest",
  "code": "<?php [...] class PersonTest { [...] }",
  "executionTime": 0.057
}
```

#### Création d'un test

```
POST    https://phpunitgen.io/api/v1/tests
```

**Arguments**

Ces arguments doivent être fournis sous forme d'un contenu de requête au format `application/json`.

* **code** `[string]` : le code PHP pour lequel générer un test.
* **config** `[object]` : la configuration a utilisé pour générer le test. Voir la [page
sur la configuration](/fr/configuration.md) pour plus de détail sur chaque paramètre de cet objet.

Voici un exemple de contenu d'une requête :

```json
{
 "code": "<?php [...Le code PHP pour lequel générer un test...]",
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

**Réponse**

Retourne un objet "test" si la requête a été correctement traitée avec un code
`HTTP 200`.

Retourne un objet d'erreur avec un code `HTTP 422` si les paramètres fournis
sont invalides (par exemple un booléen à la place d'un tableau).

Retourne un objet d'erreur avec un code `HTTP 400` une erreur s'est produite
pendant la génération. Cela peut être dû à une erreur dans votre code PHP, mais
également à un erreur de PhpUnitGen lui-même.

N'hésitez pas à soumettre une [issue GitHub
](https://github.com/paul-thebaud/phpunitgen-core/issues) si vous avez une quelconque question.

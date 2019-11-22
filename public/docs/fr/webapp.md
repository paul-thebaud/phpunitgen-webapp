# Application Web & API

## Application Web

L'application est la manière la plus simple d'utiliser PhpUnitGen. Elle vous permet donc
d'essayer l'outil, pour savoir s'il répond à vos besoins.

La configuration et personnalisation y sont assez poussées, mais pas autant que pour
la ligne de commande ou le coeur de l'outil. En effet, vous ne pouvez surcharger
que le générateur de tests ou de mocks, et il vous est impossible d'ajouter les votres.

## API

L'API est actuellement utilisée par l'application web pour récupérer la liste des générateurs de
tests/mocks disponibles, et générer les tests.

Vous pouvez utiliser cette API librement et gratuitement.

> Sachez que l'entête HTTP `Accept-Language` vous permet de définir la langue dans laquelle
> les noms et les descriptions des générateurs seront fournies.

!> L'API échange des données JSON. Vous devez donc fournir les headers HTTP
`Accept: application/json` et `Content-Type: application/json` pour obtenir des réponses
dans un format correct.

### Générateurs de tests

TODO

### Générateurs de mocks

TODO

### Génération de test

TODO

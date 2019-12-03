# Configuration

## Introduction

La configuration de PhpUnitGen est la même sur l'application Web ou la ligne
de commande, car elle est intégrée au cœur de l'outil.

Elle vous permet de personnaliser la génération de vos tests, via différents paramètres.

Si vous pensez qu'une option de configuration est manquante, n'hésitez pas à nous la proposer.

!> L'outil en ligne de commande dispose de quelques options supplémentaires dûes
à son fonctionnement, vous pouvez les voir [ici](/fr/command-line.md#configuration).

## Paramètres de la configuration

Voici une liste des paramètres de configuration de PhpUnitGen.

!> Si vous utilisez l'API, n'oubliez pas que les clés des paramètres doivent être
écrites au format `snake_case` au lieu de `camelCase`.

#### Génération automatique

* **Clé du paramètre** : `automaticGeneration`
* **Type** : `boolean`
* **Optionel** : `Non`
* **Description** : Définit si le générateur doit tenter de générer des propriétés et des tests
avancés ou juste des méthodes vides à remplir.

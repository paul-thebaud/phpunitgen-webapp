# Ancienne version

`phpunit-generator` est l'ancienne version majeur de PhpUnitGen.

Elle est abandonnée depuis la sortie des nouvelles versions stables de PhpUnitGen.
Si vous l'utilisez, vous devriez songer à rapidement changer pour les nouvelles versions.

Vous pouvez installer la nouvelle version de l'outil facilement en suivant
le guide de la [ligne de commande](/fr/command-line.md).

## Différences majeures

Même si l'objectif des deux versions de l'outil est le même, il y a de nombreuses différences :

* Le coeur de PhpUnitGen a totalement été réécrit, afin de rendre l'outil beaucoup plus modulaire.
Le code PHP pour l'utiliser est donc totalement différent.
* Les annotations comme `@Pug\assertTrue()` ont été retiré de l'outil, car elles engendrent une pollution
du code source qui les utilise.
* PhpUnitGen ne génère plus de tests pour les méthodes protégées, privées ou pour les interfaces.
* La configuration de la ligne de commande n'a plus le même format et les mêmes paramètres.

> En raison de toutes ces différences, il est compliqué de mettre en place un véritable guide de migration.
> Le plus simple est donc de suivre la nouvelle documentation.

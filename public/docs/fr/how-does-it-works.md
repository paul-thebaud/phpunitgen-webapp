# Comment ça fonctionne ?

Le fonctionnement de PhpUnitGen peut être découpé en trois étapes, depuis
l'instant où vous fournissez votre configuration et votre code jusqu'à
la récupération de votre test généré.

## Démarrage

La phase de démarrage de l'outil inclut la récupération de la configuration
et l'instantiation du conteneur de dépendances en fonction de cette dernière.

## Etape 1 : analyse du code source

La première étape pour PhpUnitGen est d'analyser le code source que vous lui
fournissez. Pour cela, il crée des objets de [Reflection](https://www.php.net/manual/fr/book.reflection.php)
qui décrivent la classe, les propriétés et les méthodes déclarées.

Il est important de comprendre que ces objets sont créés à partir d'un analyseur statique
de code, et non en important (via `include` ou `require`) votre code.

Ainsi, votre code n'est jamais exécuté. C'est grâce à cela que nous pouvons fournir
une application Web et une API sans risquer d'exécuter un code PHP malicieux sur notre serveur.

L'analyseur statique de code que PhpUnitGen utilise est disponible ici :
[Roave/BetterReflection](https://github.com/Roave/BetterReflection).

> PhpUnitGen va essayer d'analyser vos déclarations de types de paramètres et de retour de
> methode en premier. Cependant, si vous n'utilisez pas le typage de PHP, l'outil essayera
> d'analyser la documentation phpDoc de votre code pour trouver les types de paramètres et de retour.

## Etape 2 : génération du modèle du test

Une fois le modèle de données de votre code source récupéré, il est temps de générer votre
test !

PhpUnitGen va utiliser votre configuration pour choisir le générateur de test à utiliser
ainsi que d'autres paramètres utiles tels que votre namespace de base ou de test.
Le générateur a pour tâche de générer le modèle de données du test (nom de la classe, contenu, etc).
Il existe de nombreux générateurs, permettant de créer des tests pour des classes PHP variées.

## Etape 3 : rendu du modèle de test

Enfin, une fois le modèle de données de votre test récupéré, PhpUnitGen va
rendre ce modèle au format chaîne de caractères : c'est le code source de votre test.

## Plus de détails ...

Chacune de ces étapes utilisent des implémentations d'interfaces, ce qui permert à l'outil de gagner
en modularité et en maintenabilité.

Si vous estimez qu'une des implémentations n'est pas faite pour vous, vous pouvez tout à fait utiliser
la votre. [En savoir plus](/fr/advanced-usage.md).

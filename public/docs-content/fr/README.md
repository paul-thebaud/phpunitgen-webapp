# PhpUnitGen {docsify-ignore-all}

PhpUnitGen est un outil sur le Web et en ligne de commande pour générer les squelettes des tests unitaires de vos
projets PHP.

L'outil est décomposé en trois répertoires GitHub.

- [phpunitgen-core](https://github.com/paul-thebaud/phpunitgen-core), qui contient le cœur du fonctionnement de l'outil.
- [phpunitgen-console](https://github.com/paul-thebaud/phpunitgen-console), qui contient l'outil en ligne de commande.
- [phpunitgen-webapp](https://github.com/paul-thebaud/phpunitgen-webapp), qui contient l'application Web et l'API.

## Fonctionnalités principales

- Génère les squelettes de tests pour vos classes PHP ;
- Se lie à la commande "make" de Laravel ;
- Génère l'instanciation des classes en utilisant des paramètres fictifs ou des mocks ;
- S'adapte à la génération de mocks PHPUnit ou Mockery ;

> PhpUnitGen n'est pas destiné à générer le contenu de vos tests mais seulement le squelette
> (sauf pour les getters/setters).
> En effet, inspecter votre code pour générer le test approprié serait beaucoup trop complexe, et pourrait avoir pour
> résultat de manquer certaines des fonctionnalités du code ou de les marquer comme "test unitaire réussi" même s'il s'
> agit d'erreurs.

## Contenu de la documentation

Voici les informations que vous pourrez trouver dans cette documentation :

- [Description du fonctionnement de l'outil](/fr/how-does-it-work.md)
- [Configuration de l'outil](/fr/configuration.md)
- [Comment utiliser l'application en ligne ou l'API ?](/fr/webapp.md)
    - [Démarrage rapide avec l'application web](/fr/webapp.md#démarrage-rapide)
- [Comment utiliser l'outil en ligne de commande ?](/fr/command-line.md)
    - [Démarrage rapide avec la ligne de commande](/fr/command-line.md#démarrage-rapide)
- [Utilisation avancée](/fr/advanced-usage.md)

## Vous voulez supporter le projet ?

Si vous avez des idées d'améliorations, nous acceptons volontiers les pull-requests et les issues sur GitHub.

Nous n'avons pas de page de donation ou de sponsoring, donc si vous appréciez le projet, vous pouvez mettre des étoiles
ou contribuer aux 3 répertoires GitHub :

- [phpunitgen-core](https://github.com/paul-thebaud/phpunitgen-core)
- [phpunitgen-console](https://github.com/paul-thebaud/phpunitgen-console)
- [phpunitgen-webapp](https://github.com/paul-thebaud/phpunitgen-webapp)

Merci !

## Crédits

- [Paul Thébaud](https://github/paul-thebaud)
- [Killian Hascoët](https://github.com/KillianH)
- [Contributeurs GitHub](https://github.com/paul-thebaud/phpunitgen-core/graphs/contributors)

## License

PhpUnitGen est un outil open source sous
[license MIT](https://opensource.org/licenses/MIT).


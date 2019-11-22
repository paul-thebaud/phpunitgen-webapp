# Application Web

**Exigences pour installer l'outil**

Si vous utilisez l'outil en ligne de commande ou le cœur, vous devez satisfaire
les exigences suivantes :

- PHP `7.2` et supérieur.
- Laravel `5.7` et supérieur si vous souhaitez utilisez
[l'intégration à Laravel](/fr/command-line.md#laravel).

```php
<?php

use PhpUnitGen\Core\CoreApplication;
use PhpUnitGen\Core\Parsers\Sources\LocalFileSource;

$application = CoreApplication::make([/* configuration goes here */]);

$source = new LocalFileSource('/path/to/MyClass.php');

$result = $application->run($source);

var_dump($result->toString());
```

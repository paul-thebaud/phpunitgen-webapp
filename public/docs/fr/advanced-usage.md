# Utilisation avancée

TODO

## Définir une implémentation à utiliser

TODO

## Générateur de tests personnalisé

TODO

## Générateur de mocks personnalisé

TODO

```php
<?php

use PhpUnitGen\Core\CoreApplication;
use PhpUnitGen\Core\Parsers\Sources\LocalFileSource;

$application = CoreApplication::make([/* configuration goes here */]);

$source = new LocalFileSource('/path/to/MyClass.php');

$result = $application->run($source);

var_dump($result->toString());
```

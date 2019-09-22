# How does it works?

## Step 0: Configuration retrieving

Before analysing your code and generating your tests, PhpUnitGen will
retrieve the configuration you gave to it.

This is where you tell the tool how the tests should be generated, which methods
should be parsed, etc.

## Step 1: Code parsing

First real step for PhpUnitGen is to parse your code. This will allow the tool
to detect your class, its properties and methods without importing it.

This method will not really include your code in the web application, to avoid
security issue.

!> Since PhpUnitGen does not really include or require your file content,
it cannot knows anything about the extended classes, and so won't take care
about them.

## Step 2: Test generation

Next, it will generate a tests model (an object tree) containing the test case
name, properties and methods.

This model contains many information about the tests, such as method
documentation and content, properties, etc.

## Step 3: Rendering

Finally, PhpUnitGen will render a PHPUnit test case class using the generated
model. This is what you see as the "generated tests".

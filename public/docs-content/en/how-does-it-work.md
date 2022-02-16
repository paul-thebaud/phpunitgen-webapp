# How does it work? {docsify-ignore-all}

PhpUnitGen's operation is divided into three steps, from
the moment you provide your configuration and code up to
the recovery of your generated test.

## Initialization

The initialization phase of the tool includes the recovery of the configuration
and the instantiation of the dependency container according to the latter.

## Step 1: Analysis of the source code

The first step is to analyze the source code you have given it
provide. To do this, it creates [Reflection](https://www.php.net/manual/en/book.reflection.php) objects
which describe the class, properties and methods declared.

It is important to understand that these objects are created from a static analyzer
code, and not by importing (via `include` or `require`) your code.

Thus, your code is never executed. It is thanks to this that we can provide
a web application and API without running malicious PHP code on our server.

The static code analyzer that PhpUnitGen uses is available here:
[Roave/BetterReflection](https://github.com/Roave/BetterReflection).

> PhpUnitGen will try to analyze your parameter type and return declarations of
> method first. However, if you do not use PHP typing, the tool will try
> analyze the phpDoc  of your code to find the types of parameters and return.

## Step 2: Generation of the test model

Once the data model of your source code has been recovered, it is time to generate your
test !

PhpUnitGen will use your configuration to choose the test generator to use
as well as other useful parameters such as your base or test namespace.
The generator is responsible for generating the test data model (class name, content, etc.).
There are many generators, allowing you to create tests for various PHP classes.

## Step 3: Rendering the test model

Finally, once the data model of your test is generated, PhpUnitGen will
return this template in string format: this is the source code of your test.

## More details...

Each of these steps uses interface implementations, which allows the tool to gain
in modularity and maintainability.

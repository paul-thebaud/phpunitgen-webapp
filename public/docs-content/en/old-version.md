# Old version

`phpunit-generator` is the previous major version of PhpUnitGen.

It has been abandoned since the release of the new stable versions of PhpUnitGen.
If you are using it, you should consider switching to the new versions quickly.

You can install the new version of the tool easily by following
the [command line](/en/command-line.md) guide.

## Major differences

Although the objective of the two versions of the tool is the same, there are many differences:

* The core of PhpUnitGen has been totally rewritten to make the tool much more modular.
The PHP code to use it is therefore totally different.
* Annotations like `@Pug\assertTrue()` have been removed from the tool, because they cause pollution
of the source code that uses them.
* PhpUnitGen no longer generates tests for protected or private methods and interfaces.
* The command line configuration no longer has the same format and parameters.

> Because of all these differences, it is complicated to set up a real migration guide.
> The simplest thing to do is to follow the new documentation.

# PhpUnitGen {docsify-ignore-all}

PhpUnitGen is an online and command line tool to generate your unit tests' skeletons on your projects.

The tool is divided into three GitHub repositories.

- [phpunitgen-core](https://github.com/paul-thebaud/phpunitgen-core), which contains the core of the tool's features.
- [phpunitgen-console](https://github.com/paul-thebaud/phpunitgen-console), which contains the command line interface.
- [phpunitgen-webapp](https://github.com/paul-thebaud/phpunitgen-webapp), which contains the web application and the API.

## Key features

- Generates tests skeletons for your PHP classes
- Binds with Laravel "make" command
- Generates class instantiation using dummy parameters or mocks
- Adapts to PHPUnit or Mockery mocks generation

> PhpUnitGen is not meant to generate your tests content but only the skeleton
> (except for getters/setters).
> This is because inspecting your code to generate the appropriate test is
> way too complex, and might result in missing some of the code's features
> or marking them as "passed unit test" even if it contains errors.

## Content of the documentation

Here is the information you can find in this documentation:

- [Description of the tool's operation](/en/how-does-it-work.md)
- [Configuration of the tool](/en/configuration.md)
- [How to use the online application or API?](/en/webapp.md)
    - [Getting started with the web application](/en/webapp.md#getting-started)
- [How to use the command line interface?](/en/command-line.md)
    - [Getting started with the command line](/en/command-line.md#getting-started)

## Do you want to support the project?

If you have any ideas for improvements, we are happy to accept pull-requests and issues on GitHub.

We do not have a donation or sponsorship page, so if you like the project, you can
put stars or contribute to the 3 GitHub repositories:

- [phpunitgen-core](https://github.com/paul-thebaud/phpunitgen-core)
- [phpunitgen-console](https://github.com/paul-thebaud/phpunitgen-console)
- [phpunitgen-webapp](https://github.com/paul-thebaud/phpunitgen-webapp)

Thank you!

## Credits

- [Paul Thébaud](https://github/paul-thebaud)
- [Killian Hascoët](https://github.com/KillianH)
- [GitHub contributors](https://github.com/paul-thebaud/phpunitgen-core/graphs/contributors)

## License

PhpUnitGen is an open source tool under
[MIT license](https://opensource.org/licenses/MIT).


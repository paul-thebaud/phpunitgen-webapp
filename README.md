<h1 align="center">PhpUnitGen - Web application</h1>

<p align="center">
<a href="https://travis-ci.org/paul-thebaud/phpunitgen-webapp" target="_blank"><img src="https://travis-ci.org/paul-thebaud/phpunitgen-webapp.svg?branch=master" alt="Build Status"></a>
<a href="https://github.styleci.io/repos/190246860" target="_blank"><img src="https://github.styleci.io/repos/190246860/shield?branch=master&style=flat" alt="StyleCI"></a>
<a href="https://sonarcloud.io/dashboard?id=paul-thebaud_phpunitgen-webapp" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=paul-thebaud_phpunitgen-webapp&metric=alert_status" alt="Quality Gate Status"></a>
<a href="https://sonarcloud.io/dashboard?id=paul-thebaud_phpunitgen-webapp" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=paul-thebaud_phpunitgen-webapp&metric=coverage" alt="Coverage"></a>
</p>

## About PhpUnitGen

> **Note:** this repository contains the webapp code of PhpUnitGen. If you want to use
> the tool on your console, you can install the
> [command line package](https://github.com/paul-thebaud/phpunitgen-console). 
> If you want to see the core code, you should go on
> [core package](https://github.com/paul-thebaud/phpunitgen-core).

PhpUnitGen is an online and command line tool to generate your unit tests'
skeletons on your projects.

- [How does it works?](https://phpunitgen.io/docs#/en/how-does-it-works)
- [Configuration](https://phpunitgen.io/docs#/en/configuration)
- [Web application](https://phpunitgen.io/docs#/en/webapp)
- [Command line](https://phpunitgen.io/docs#/en/command-line)
- [Advanced usage](https://phpunitgen.io/docs#/en/advanced-usage)

## Roadmap

You can track the tasks we plan to do on our
[Taiga.io project](https://tree.taiga.io/project/paul-thebaud-phpunitgen/kanban).

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for more details.

Informal discussion regarding bugs, new features, and implementation of
existing features takes place in the
[Github issue page of Core repository](https://github.com/paul-thebaud/phpunitgen-core/issues).

## Installing the application locally

Clone this repository and into the project directory:

```bash
git clone https://github.com/paul-thebaud/phpunitgen-webapp.git

cd phpunitgen-webapp
```

Copy the environment file:

```bash
cp .env.example .env
```

Install backend and frontend dependencies using:

```bash
composer install

yarn install
```

Build the frontend files:

```bash
yarn prod
```

Run the local PHP server, and go to [http://localhost:8000](http://localhost:8000):

```bash
php -S localhost:8000 -t public
```

## Credits

- [Paul Thébaud](https://github/paul-thebaud)
- [Killian Hascoët](https://github.com/KillianH)
- [Charles Corbel](https://dribbble.com/CorbelC)
- [All Contributors](https://github.com/paul-thebaud/phpunitgen-core/graphs/contributors)

## License

PhpUnitGen is an open-sourced software licensed under the
[MIT license](https://opensource.org/licenses/MIT).

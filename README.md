<p align="center"><img src="https://raw.githubusercontent.com/paul-thebaud/phpunitgen-webapp/master/resources/svg/logo.svg?sanitize=true" alt="PhpUnitGen" height="50"></p>

<p align="center">
<a href="https://travis-ci.org/paul-thebaud/phpunitgen-webapp" target="_blank"><img src="https://travis-ci.org/paul-thebaud/phpunitgen-webapp.svg?branch=master" alt="Build Status"></a>
<a href="https://github.styleci.io/repos/190246860" target="_blank"><img src="https://github.styleci.io/repos/190246860/shield?branch=master&style=flat" alt="StyleCI"></a>
<a href="https://sonarcloud.io/dashboard?id=paul-thebaud_phpunitgen-webapp" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=paul-thebaud_phpunitgen-webapp&metric=alert_status" alt="Quality Gate Status"></a>
<a href="https://sonarcloud.io/dashboard?id=paul-thebaud_phpunitgen-webapp" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=paul-thebaud_phpunitgen-webapp&metric=coverage" alt="Coverage"></a>
</p>

## Installation

The CLI tool can be installed using:
```bash
composer require --dev phpunitgen/console
```

Detailed information and webapp version are available at
[https://phpunitgen.io](https://phpunitgen.io).

## About PhpUnitGen

> **Note:** this repository contains the webapp code of PhpUnitGen. If you want to use
> the tool on your console, you can install the
> [command line package](https://github.com/paul-thebaud/phpunitgen-console). 
> If you want to see the core code, you should go on
> [core package](https://github.com/paul-thebaud/phpunitgen-core).

PhpUnitGen is an online and command line tool to generate your unit tests'
skeletons on your projects.

- [How does it work?](https://phpunitgen.io/docs#/en/how-does-it-work)
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

## Build docker images

### PHP-fpm

```bash
docker build -t phpunitgen-phpfpm -f ./docker/Dockerfile-phpfpmalpine .
```

### Nginx local

```bash
docker build -t phpunitgen-nginx -f ./docker/local/Dockerfile-nginxalpine .
```

### Nginx production

```bash
docker build -t phpunitgen-nginx -f ./docker/production/Dockerfile-phpfpmalpine .
```

## Run docker images

### PHP-fpm local

```bash
docker run -d --name phpunitgen-phpfpm -p 9000:9000 -v <root project directory>:/var/wwww phpunitgen-phpfpm
```

### Nginx local
```bash
docker run -d --name phpunitgen-nginx -p 80:80 443:443 \
    -v <root project directory>/nginx/local/local.pem:/local.pem \
    -v <root project directory>/nginx/local/local-key.pem:/local-key.pem \
    -v <root project directory>:/var/www \
    -v <root project directory>/nginx/local/app.conf:/etc/nginx/conf.d/default.conf \
    -v <root project directory>/nginx/nginx.conf:/etc/nginx/nginx.conf \
    phpunitgen-nginx
```

### PHP-fpm production

```bash
docker run -d --name phpunitgen-phpfpm -p 9000:9000 phpunitgen-phpfpm
```

### Nginx production
```bash
docker run -d --name phpunitgen-nginx -p 80:80 443:443 \
    -v <root project directory>/nginx/local/local.pem:/local.pem \
    -v <root project directory>/nginx/local/local-key.pem:/local-key.pem \
    phpunitgen-nginx
```

## Installing the application with docker-compose

### HTTPS

To issue local certificates for HTTPS we used [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)

You just need to put your local.pem (certificate) and local-key.pem (private key) in the nginx/local/ folder.

### Development

On the local dev compose file there're different volumes used to facilitate your local development.
You can use "yarn watch" and edit the blade file directly from your local files.
However, if you change any php dependencies you will need to rebuild the phpunitgen-phpfpm container.

```bash
docker-compose -f ./docker-compose.local.dev.yml up --build
```

### Production-like (Used to test on with an environment near the production architecture)

This compose file will generate two container with less volumes. (Only your local certificates to enable https)

```bash
docker-compose -f ./docker-compose.local.prod.yml up --build
```

## Installing with kubernetes

### Staging

```bash
kubectl apply -k kubernetes/staging/
```

### Production

```bash
kubectl apply -k kubernetes/production/
```

## Credits

- [Paul Thébaud](https://github/paul-thebaud)
- [Killian Hascoët](https://github.com/KillianH)
- [Charles Corbel](https://dribbble.com/CorbelC)
- [All Contributors](https://github.com/paul-thebaud/phpunitgen-core/graphs/contributors)

## License

PhpUnitGen is an open-sourced software licensed under the
[MIT license](https://opensource.org/licenses/MIT).

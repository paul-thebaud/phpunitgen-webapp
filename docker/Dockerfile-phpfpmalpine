FROM php:fpm-alpine

#################################################
#               Install depedencies             #
#################################################
RUN apk add libpng-dev wget
RUN docker-php-ext-install gd bcmath

#################################################
#                   Workdir                     #
#################################################

COPY . /var/www
WORKDIR /var/www
RUN chown -R www-data:www-data \
        /var/www/storage

#################################################
#                   Composer                    #
#################################################

RUN chmod +x composerinstall.sh
RUN ./composerinstall.sh
RUN php composer.phar install --no-scripts \
    && rm composer.phar
RUN rm composerinstall.sh

#################################################
#                   Artisan                     #
#################################################
RUN mv .env.example .env

#################################################
#                    Expose                     #
#################################################

#FPM
EXPOSE 9000

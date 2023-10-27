FROM php:fpm-alpine
RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN mkdir /app
VOLUME /app
WORKDIR /app

EXPOSE 3000
CMD php artisan serve --host=0.0.0.0 --port=3000

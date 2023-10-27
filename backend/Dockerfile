FROM php:8.1-fpm-alpine

RUN docker-php-ext-install pdo pdo_mysql sockets

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app
COPY . /app

EXPOSE 3000
CMD composer install && php artisan serve --host=0.0.0.0 --port=3000

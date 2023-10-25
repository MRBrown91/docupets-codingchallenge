FROM php:fpm-alpine

RUN mkdir /app
VOLUME /app
WORKDIR /app

EXPOSE 3000
CMD php artisan serve --host=0.0.0.0 --port=3000

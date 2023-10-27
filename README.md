# Coding Test

Oct 26, 2023

## Project Setup
The following commands will pull the application, create the docker containers, and populate the mysql database.
```
git clone https://github.com/MRBrown91/docupets-codingchallenge.git 
cd docupets-codingchallenge
docker-compose up -d --build
docker-compose up
```
Wait for all containers to complete their setup, this can take some time as composer install runs on build.  This is a side effect of running laravel in this docker environment which will be resolved.
```
docker exec backend php artisan migrate:fresh --seed
```
The application can then be viewed at http://localhost

## Project Notes
- The Laravel application runs very slowly within the docker image.  The application itself is performant, but can not be seperated due to reliance on the dockerized sql container.
- ENV files were committed.  This would NEVER be done in a production environment, but was allowed due to lack of real credentials and for ease of testing.
- COMPOSER_ALLOW_SUPERUSER was used to resolve a docker issue due to time constraints.

## Project Structure
- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)
# Coding Test

Oct 26, 2023

## Project Setup
The following commands will pull the application, create the docker containers, and populate the mysql database.
```
git clone https://github.com/MRBrown91/docupets-codingchallenge.git 
cd docupets-codingchallenge
docker-compose up -d --build
docker-compose up
docker exec backend php artisan migrate:fresh --seed
```
 

## Project Notes
- The Laravel application runs very slowly within the docker image.  The application itself is performant, but can not be seperated due to reliance on the dockerized sql container.
- ENV files were committed.  This would NEVER be done in a production environment, but was allowed due to lack of real credentials and for ease of testing.

## Project Structure
- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)
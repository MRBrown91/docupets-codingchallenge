# Coding Test Backend

Oct 26, 2023

## Changes Made
- Updated application to accept api routes by default as the frontend application is separately handled.
- Created API resource routes for Pet data, and a get route for breed data
- Created Migration scripts and seeders to generate basic scheme and populate breed data
- Created Pet and Breed controllers to handle CRUD interactions
- Created StorePetRequest class to pre-validate pet data before controller operations to maintain single responsibility
- Created Resources for future augmentation of Pet and Breed JSON responses
- Updated the Exception handler to replace NotFoundHttpException exception with more human-readable alternative which did not expose application structure 

## Future Considerations
- Implement caching, this was only not done due to docker complications
- The dockerized Laravel API is very slow to return resources.  A more appropriate platform would be needed before release
- Generate Swagger documentation for API
- Implement unit testing for controllers
- Implement CRUD endpoints for breeds
- Update Pet table and model to refer to breeds via foreign key (time restraint)
- Authentication via Sanctum
- Expand API to meet all restful principles

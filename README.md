# Star Wars Encyclopedia API

Design and build a fully-functional, back-end-only API that serves as an encyclopedia for Star Wars information. The API will include Authentication and Authorization, protecting certain routes with Authorization.

## Tech Stack

JavaScript, Express, React, SQLite3, Jest, and Auth0 (for OAuth)

## Tier 1 — MVP Application - CRUD and REST

As a User, I want to read entries from the database.
As a User, I want to add entries to the database.
As a User, I want to delete entries from the database.
As a User, I want to edit entries in the database.
As a User, I expect to do all of the above by accessing RESTful routes.

Reading, adding, deleting, and editing entries from the database are all covered by the API endpoints that are already created.

## Tier 2 - Login, Hashing, and OAuth Authentication

- [x] Import necessary modules (bcrypt, jsonwebtoken) for password hashing and authentication.
- [x] Configure the config object in the server.js file with your Auth0 credentials. Update the values of clientID, issuerBaseURL, and AUTH0_SECRET in the .env file with your own values.
- [x] Add the necessary routes and handlers for OAuth authentication using Auth0. This includes `/login`, `/logout`, and `/callback` routes. You can create separate files in the routes directory, such as `auth.js`, to handle these routes.
- [x] Use the `auth()` middleware provided by `express-openid-connect` to enable the authentication routes.

## Tier 3 - Register, JSON Web Tokens (JWTs), and User Authorization

- [x] Implement user registration in the `/register` endpoint.
- [x] Modify the registration endpoint to include password hashing using bcrypt.
- [x] Generate JSON Web Tokens (JWTs) using Auth0 for user authorization.
- [x] Implement the routes and handlers for OAuth authentication, including `/login`, `/logout`, and `/callback`.
- [x] Use the `jsonwebtoken` library to generate JSON Web Tokens (JWTs) using Auth0 for user authorization.
- [x] Implement the necessary middleware to protect routes and prevent unauthorized access.
- [ ] Test your backend API to ensure that authentication and authorization are working as expected.
- [x] Create the Star Wars Encyclopedia API routes and handlers to provide access to Star Wars information.
- [x] Implement Authentication and Authorization for the Star Wars Encyclopedia routes.

## Tier 4 - Authorization

- [ ] Implement authorization middleware to protect routes and prevent unauthorized access.
- [ ] Modify the existing `/protected` route to use the `authenticateToken` middleware, which verifies the JWT token.
- [ ] Provide helpful error messages for unauthorized access or invalid tokens.

## Tier 5 - Associated Data

- [ ] Add routes and handlers to read a single entry and associated data.
- [ ] Use OpenID Connect (OIDC) with Auth0 to authenticate and authorize users.

## Tier 6 - Admin vs User

- [ ] Create a special super-user account type for admins with elevated access privileges.
- [ ] Modify the route handlers and middleware to handle admin-specific functionalities such as editing other users' information and accessing all entries.

## Project Structure

my-backend-project/
├── client/
│ ├── public/
│ └── src/
│ ├── App.js
│ ├── index.js
│ └── ...
└── server/
├── config/
│ └── .env
├── controllers/
│ ├── authController.js (Completed)
│ └── ...
├── db/
│ ├── create-database.js (Completed)
│ └── starwars.db (Completed)
├── models/
│ └── ...
├── routes/
│ ├── auth.js (Completed)
│ ├── routes.js (Completed)
│ └── ...
├── tests/
│ └── ... (To be added)
├── middleware.js (Completed)
├── server.js (Completed)
├── authorizationMiddleware.js (To be added)
├── associatedDataRoutes.js (To be added)
├── associatedDataHandlers.js (To be added)
├── oidcAuth.js (To be added)
├── adminFunctionality.js (To be added)
└── ...

Keep the client-side code in the client directory.
Keep the server-side code in the server directory and create separate subdirectories for controllers, db, models, routes, and tests.

Please note that this diagram reflects the current state based on the progress made. The completed files are marked as "(Completed)", and the remaining files and folders are indicated with "(To be added)" and will need to be created to complete the desired project structure.

INITIAL SETUP ONLY NEED TO ADD FILES/FOLDERS ETC AND CHOSEN API DATA AS PER PROJECT STRUCTURE BELOW - SEE ALSO BOTTOM OF README FOR ACTIONS STILL TO COMPLETE

# My Backend Project

Design and build a fully-functional, back-end-only API, complete with Authentication and Authorization, protecting some (or all) routes with Authorization.

## Tech Stack

JavaScript, Express, React, SQLite3, Jest, and Auth0 (for OAuth)

## Tier 1 — MVP Application - CRUD and REST

As a User, I want to read entries from the database.
As a User, I want to add entries to the database.
As a User, I want to delete entries from the database.
As a User, I want to edit entries in the database.
As a User, I expect to do all of the above by accessing RESTful routes.

Reading, adding, deleting, and editing entries from the database are all covered by the API endpoints that are created already

## Tier 2 - Login, Hashing:

Already imported the necessary modules (bcrypt, jsonwebtoken) for password hashing and authentication.

## I AM HERE - SEE ALSO STILL TO COMPLETE NOTES AT BOTTOM OF README

Implement OAuth 2.0 with Auth0 for user authentication by configuring the config object with your Auth0 credentials (client ID, issuer base URL, etc.).
Add the necessary routes and handlers for OAuth authentication using Auth0. This includes /login, /logout, and /callback routes.
Modify the registration endpoint (/register) to include password hashing using bcrypt.
Create the routes directory within the server directory. This directory will contain the route handlers for different API endpoints. Start by creating a separate file for each resource or group of related routes (e.g., users.js, entries.js).
Create an index.js file within the server directory. This file will serve as the entry point for your server application. It will import and configure the necessary dependencies, set up the server, and connect to the database.
Create a tests directory within the server directory. This directory will contain your test files. You can organize them based on the corresponding directories and files in your main codebase (e.g., controllers, routes, models).

## Tier 3 - Register:

Already implemented user registration in the /register endpoint.
Ensure that users can sign up for the API using OAuth 2.0 with Auth0.
Generate JSON Web Tokens (JWTs) using Auth0 for user authorization.

## Tier 4 - Authorization:

Implement authorization middleware to protect routes and prevent unauthorized access.
Modify the existing /protected route to use the authenticateToken middleware, which verifies the JWT token.
Provide helpful error messages for unauthorized access or invalid tokens.

## Tier 5 - Associated Data: NOT BEGUN AT ALL

Add routes and handlers to read a single entry and associated data.
Use OpenID Connect (OIDC) with Auth0 to authenticate and authorize users.
Can create the client directory at the root level. Within the client directory, you can set up the necessary folders and files for your React client application, such as public and src. This is where you can place your App.js, index.js, and other client-side code files.

## Tier 6 - Admin vs User: NOT BEGUN AT ALL

Create a special super-user account type for admins with elevated access privileges.
Modify the route handlers and middleware to handle admin-specific functionalities such as editing other users' information and accessing all entries.

## Project Structure

Keep the client-side code in the client directory.
Keep the server-side code in the server directory and create separate subdirectories for controllers, db, models, routes, and tests.

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
│ └── ...
├── db/
│ ├── migrations/
│ └── seeds/
├── models/
│ └── ...
├── routes/
│ └── ...
├── tests/
│ └── ...
├── index.js
└── ...

STILL TO COMPLETE WORK IN PROGRESS:
Instructions
Task 1: Implement OAuth 2.0 with Auth0 for user authentication
To implement OAuth 2.0 with Auth0 for user authentication, you need to complete the following steps:

Set up an account with Auth0 (if you haven't already).
Configure the config object in the server.js file with your Auth0 credentials. Update the values of clientID, issuerBaseURL, and AUTH0_SECRET in the .env file with your own values.
Add the necessary routes and handlers for OAuth authentication using Auth0. This includes /login, /logout, and /callback routes. You can create separate files in the routes directory, such as auth.js, to handle these routes.
Use the auth() middleware provided by express-openid-connect to enable the authentication routes. You have already added this middleware in the existing code.
Test the authentication routes by logging in and logging out using the Auth0 authentication flow.
Task 2: Hash passwords using bcrypt
To hash passwords using bcrypt, you need to modify the registration endpoint (/register) as follows:

Import the bcrypt module at the top of the server.js file.
Modify the /register endpoint to include password hashing using bcrypt before inserting the new user into the database. You can use the bcrypt.hash() function to hash the password.
Update the database insertion code to use the hashed password instead of the plain text password.
Task 3: Create the routes, tests, and other directories
Create a new directory called routes within the server directory. This directory will contain the route handlers for different API endpoints. Start by creating a separate file for each resource or group of related routes (e.g., users.js, entries.js).
Create a new directory called tests within the server directory. This directory will contain your test files. You can organize them based on the corresponding directories and files in your main codebase (e.g., controllers, routes, models).
You can also create additional directories such as controllers, models, db, etc., as mentioned in the project structure.
Task 4: Create an index.js file within the server directory
Create an index.js file within the server directory. This file will serve as the entry point for your server application.
In the index.js file, import and configure the necessary dependencies, such as express, cors, and other modules used in your code.
Set up the server and connect to the database. You can copy the existing server setup code from server.js and modify it if needed.
Task 5: Update the protected route and add middleware for authorization
Modify the existing /protected route in server.js to use the authenticateToken middleware. This middleware verifies the JWT token and allows access to the protected route.
Create a new file in the routes directory, such as protected.js, to define the protected routes and handlers.
Implement the authenticateToken middleware function, which verifies the JWT token. You can keep this function in the server.js file or create a separate file for middleware functions.
Add the middleware function to the protected route in the protected.js route file.
These tasks will help you continue building your project. Once you complete these steps, you can proceed with the next tiers mentioned in the readme, such as implementing associated data, handling admin functionality, and organizing the client-side code in the client directory

# my-backend-project

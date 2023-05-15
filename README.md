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

Reading, adding, deleting, and editing entries from the database are all covered by the API endpoints that were created.

## Tier 2 - Login, Hashing:

You have already imported the necessary modules (bcrypt, jsonwebtoken) for password hashing and authentication.
Implement OAuth 2.0 with Auth0 for user authentication by configuring the config object with your Auth0 credentials (client ID, issuer base URL, etc.).
Add the necessary routes and handlers for OAuth authentication using Auth0. This includes /login, /logout, and /callback routes.
Modify the registration endpoint (/register) to include password hashing using bcrypt.
Create the routes directory within the server directory. This directory will contain the route handlers for different API endpoints. You can start by creating a separate file for each resource or group of related routes (e.g., users.js, entries.js).
Create an index.js file within the server directory. This file will serve as the entry point for your server application. It will import and configure the necessary dependencies, set up the server, and connect to the database.
If you plan to write tests for your backend API, create a tests directory within the server directory. This directory will contain your test files. You can organize them based on the corresponding directories and files in your main codebase (e.g., controllers, routes, models).

## Tier 3 - Register:

You have already implemented user registration in the /register endpoint.
Ensure that users can sign up for the API using OAuth 2.0 with Auth0.
Generate JSON Web Tokens (JWTs) using Auth0 for user authorization.

## Tier 4 - Authorization:

Implement authorization middleware to protect routes and prevent unauthorized access.
Modify the existing /protected route to use the authenticateToken middleware, which verifies the JWT token.
Provide helpful error messages for unauthorized access or invalid tokens.

## Tier 5 - Associated Data:

You haven't implemented this tier yet.
Add routes and handlers to read a single entry and associated data.
Use OpenID Connect (OIDC) with Auth0 to authenticate and authorize users.
You can create the client directory at the root level. Within the client directory, you can set up the necessary folders and files for your React client application, such as public and src. This is where you can place your App.js, index.js, and other client-side code files.

## Tier 6 - Admin vs User:

You haven't implemented this tier yet.
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

Instructions
Set up the client-side code:
Create the client directory at the root level.
Within the client directory, set up the necessary folders and files for your React client application, such as public and src.
Place your App.js, `index.js

# my-backend-project

STILL TO COMPLETE WORK IN PROGRESS:
Instructions
Set up the client-side code:

Create the client directory at the root level.
Within the client directory, set up the necessary folders and files for your React client application, such as public and src.
Place your App.js, index.js, and other client-side code files in the appropriate directories.
STILL TO COMPLETE WORK IN PROGRESS:

API Data (Not associated with any specific tier):

You can start adding the necessary files and folders related to the API data within the server directory. This may include creating the db directory for managing database-related operations such as migrations and seeds. You can also create the models directory for defining your data models.

Routes (Associated with Tier 2):

Create the routes directory within the server directory. This directory will contain the route handlers for different API endpoints. You can start by creating a separate file for each resource or group of related routes (e.g., users.js, entries.js).
Index.js (Associated with Tier 2):

Create an index.js file within the server directory. This file will serve as the entry point for your server application. It will import and configure the necessary dependencies, set up the server, and connect to the database.
Tests (Associated with Tier 2 or later):

If you plan to write tests for your backend API, create a tests directory within the server directory. This directory will contain your test files. You can organize them based on the corresponding directories and files in your main codebase (e.g., controllers, routes, models).
Client-side Code (Associated with Tier 5 or later):

You can create the client directory at the root level. Within the client directory, you can set up the necessary folders and files for your React client application, such as public and src. This is where you can place your App.js, index.js, and other client-side code files.

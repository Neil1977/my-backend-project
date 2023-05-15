INITIAL SETUP ONLY NEED TO ADD FILES/FOLDERS ETC AND CHOSEN API DATA AS PER PROJECT STRUCTURE BELOW - SEE ALSO BOTTOM OF README FOR ACTIONS STILL TO COMPLETE

My Backend Project

Design and build a fully-functional, back-end-only API, complete with Authentication and Authorization, protecting some (or all) routes with Authorization.

Tech Stack
JavaScript, Express, React, SQLite3, Jest, and Auth0 (for OAuth)

Tier 1 — MVP Application - CRUD and REST
As a User, I want to read entries from the database.

As a User, I want to add entries to the database.

As a User, I want to delete entries from the database.

As a User, I want to edit entries in the database.

As a User, I expect to do all of the above by accessing RESTful routes.

Reading, adding, deleting, and editing entries from the database are all covered by the API endpoints that were created.

Tier 2 - Login, Hashing
As a User, I want any passwords saved to be hashed and salted before saved to the database using bcrypt.

Implement OAuth 2.0 with Auth0 for user authentication.
Use bcrypt to hash and salt passwords before saving them to the database

Tier 3 - Register
As a potential User, I want to be able to sign up for the API using OAuth 2.0 with Auth0.
As a signed-up User, I want to be granted authorization to access the API using JSON Web Tokens (JWT) generated by Auth0.

Users can sign up for the API using OAuth 2.0 with Auth0.
Auth0 generates JSON Web Tokens (JWTs) to grant authorization to access the API.

Tier 4 - Authorization
As a User, I want my API protected from unauthorized Users.
As an unauthorized User, I want a helpful message telling me I do not have access to the API.
As a User, I expect not to be able to create new entities without first logging in / authenticating in some way (token/session).
As a User, I want my data to only be accessible by myself.

Prevent unauthorized users from accessing the API and provide helpful error messages if they attempt to do so.
Require authentication (either with a token or session) to create new entities.
Ensure that user data is only accessible by the user who created it, and that it is only editable and deletable by the user who created it.

Tier 5 - Associated Data
In addition to the Tier 1 MVP criteria, as a User, I want to be able to read a single entry.

Allow users to read a single entry and see associated user info and other associated data using OpenID Connect (OIDC) with Auth0.

Tier 6 - Admin vs User
As an Admin, I want to have a special super-user account type that allows access to content Users don’t have access to.
As a basic User, when requesting a list of all entries, I expect to only see my own entries (not entries of other users).
As an Admin, when requesting a list of all entries, I expect to be able to see all entries, regardless of user/owner.
As an Admin, I want to be able to edit other users’ information via the API.
As an Admin, I want to be able to delete or edit any entity, regardless of user/owner.

Create a special super-user account type for admins that allows them to access content that regular users don't have access to.
When a basic user requests a list of all entries, only show their own entries.
When an admin requests a list of all entries, show all entries, regardless of the user/owner.
Allow admins to edit other users' information via the API.
Allow admins to delete or edit any entity, regardless of the user/owner.

Project Structure

Keep the client-side code in the client directory.
Keep the server-side code in the server directory, and create separate subdirectories for controllers, db, models, routes, and tests.
Use the README.md file to document the project and provide instructions for running and using the API.

.
├── client
│ ├── public
│ └── src
│ ├── App.js
│ ├── index.js
│ └── ...
├── server
│ ├── config
│ │ └── .env
│ ├── controllers
│ │ └── ...
│ ├── db
│ │ ├── migrations
│ │ └── seeds
│ ├── models
│ │ └── ...
│ ├── routes
│ │ └── ...
│ ├── tests
│ │ └── ...
│ ├── index.js
│ └── ...
├── README.md
└── ...

# my-backend-project

STILL TO COMPLETE WORK IN PROGRESS:
API Data: You can start adding the necessary files and folders related to the API data within the server directory. This may include creating the db directory for managing database-related operations such as migrations and seeds. You can also create the models directory for defining your data models.

Routes: Create the routes directory within the server directory. This directory will contain the route handlers for different API endpoints. You can start by creating a separate file for each resource or group of related routes (e.g., users.js, entries.js).

Index.js: Create an index.js file within the server directory. This file will serve as the entry point for your server application. It will import and configure the necessary dependencies, set up the server, and connect to the database.

Tests: If you plan to write tests for your backend API, create a tests directory within the server directory. This directory will contain your test files. You can organize them based on the corresponding directories and files in your main codebase (e.g., controllers, routes, models).

Client-side Code: You can create the client directory at the root level. Within the client directory, you can set up the necessary folders and files for your React client application, such as public and src. This is where you can place your App.js, index.js, and other client-side code files

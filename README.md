# Poultry Center

## Frontend 

- React: JavaScript library for building user interfaces
- Redux: State management for React applications
- CSS: Styling for the front-end user interface

## Backend

- Express: Web framework for Node.js for handling server-side logic
- SQLite3 / PostgreSQL: Database for storing User Data, Shows, Swap Meets, Posts and Reviews

## How to Locally Launch Application

Node.js is needed for this application. Link [https://nodejs.org/] for downloading node.js. SQLite3 or PostgreSQL is needed for setting up a database locally.

### Clone Repository

Get repository from [https://github.com/Thao88Bee/PoultryCenter]. In your terminal run the command `git clone https://github.com/Thao88Bee/PoultryCenter.git` to clone the repository onto your machine. Then, `cd` into the root directory of the application.

  ```bash
  git clone https://github.com/Thao88Bee/PoultryCenter.git
  cd PoultryCenter
  ```

### Install Backend Dependencies

`cd` into the `backend` folder and install the dependencies that is needed for this application by running `npm install` in the terminal.

  ```bash
  cd backend
  npm install
  ```

### Creating a .env File

In the `backend` folder, create a `.env` file.

  ```bash
  touch .env
  ```

Copy `.env.example` into the `.env` file. Then, to generate a JWT_SECRET run this command in your terminal `openssl rand -base64 10`. Choose a custom schema name in snake case.

  ```bash
  openssl rand -base64 10
  ```

### Seed Data

In the `backend` folder run this command in the termainl to seed data into your database `dev.db` file.

  ```bash
  npx dotenv sequelize db:migrate
  npx dotenv sequelize db:seed:all
  ```

To reset the database `dev.db` file, you can run this command in the terminal. Only run, if you need to reset the database.

```bash
npx dotenv sequelize db:seed:undo:all
npx dotenv sequelize db:migrate:undo:all
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

### Install Frontend Dependencies

`cd` into the `frontend` folder and install the dependencies that is needed for this application by running `npm install` in the terminal.

  ```bash
  cd frontend
  npm install
  ```

### Run Backend Server

`cd` into the `backend` folder and run `npm start` in the terminal to start the backend server. The backend server will be running on [http://localhost:8000].

  ```bash
  cd backend
  npm start
  ```

### Run Frontend Server

In another terminal `cd` into the `frontend` folder and run `npm run dev` to start the frontend server. The frontend server will run on [http://localhost:5173].

  ```bash
  cd frontend
  npm run dev
  ```
**Once both servers are running, navigate to [http://localhost:5173] in your browser to access the application.**


## Database Schema Design

![db-schema]

[db-schema]: ./images/PoultryCenterSchema.png

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /session
  - Body: none

- Successful Response when there is a logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "User": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Successful Response when there is no logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "User": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - Route path: /login
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "User": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - Route path: /signup
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "User": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Error response: User already exists with the specified email or username

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists",
        "username": "User with that username already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## SHOWS

### Get all Shows

Returns all the shows.

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /shows
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Shows": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Coulee Region Poultry Club Show",
          "date": "2025-06-07",
          "description": "Online entries can be made for our show.",
          "address": "19780 Park Drive",
          "city": "Galesville",
          "state": "Wisconsin",
          "image": "image url",
          "createdAt": "2024-11-19 20:39:36",
          "updatedAt": "2024-11-19 20:39:36",
          "Owner": {
            "id": 1,
            "firstName": "Demo",
            "lastName": "Testing",
            "email": "demo@user.io"
          }
        }
      ]
    }
    ```

### Get all Shows owned by the Current User

Returns all the shows owned (created) by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /user/shows
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Shows": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Coulee Region Poultry Club Show",
          "date": "2025-06-07",
          "description": "Online entries can be made for our show.",
          "address": "19780 Park Drive",
          "city": "Galesville",
          "state": "Wisconsin",
          "image": "image url",
          "createdAt": "2024-11-19 20:39:36",
          "updatedAt": "2024-11-19 20:39:36"
        }
      ]
    }
    ```

### Get details of a Show from an id

Returns the details of a show specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /shows/:showId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Coulee Region Poultry Club Show",
      "date": "2025-06-07",
      "description": "Online entries can be made for our show.",
      "address": "19780 Park Drive",
      "city": "Galesville",
      "state": "Wisconsin",
      "image": "image url",
      "createdAt": "2024-11-19 20:39:36",
      "updatedAt": "2024-11-19 20:39:36",
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com"
      }
    }
    ```

- Error response: Couldn't find a Show with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Show couldn't be found"
    }
    ```

### Create a Show

Creates and returns a new show.

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /shows
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Coulee Region Poultry Club Show",
      "date": "2025-06-07",
      "description": "Online entries can be made for our show.",
      "address": "19780 Park Drive",
      "city": "Galesville",
      "state": "Wisconsin",
      "image": "image url"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Coulee Region Poultry Club Show",
      "date": "2025-06-07",
      "description": "Online entries can be made for our show.",
      "address": "19780 Park Drive",
      "city": "Galesville",
      "state": "Wisconsin",
      "image": "image url",
      "createdAt": "2024-11-19 20:39:36",
      "updatedAt": "2024-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name must be less than 50 characters",
        "date": "Date cannot be in the past",
        "description": "Description is required",
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required"
      }
    }
    ```

### Edit a Show

Updates and returns an existing show.

- Require Authentication: true
- Require proper authorization: Show must belong to the current user
- Request

  - Method: PATCH
  - Route path: /shows/:showId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Coulee Region Poultry Club Show",
      "date": "2025-06-07",
      "description": "Online entries can be made for our show.",
      "address": "19780 Park Drive",
      "city": "Galesville",
      "state": "Wisconsin",
      "image": "image url"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Coulee Region Poultry Club Show",
      "date": "2025-06-07",
      "description": "Online entries can be made for our show.",
      "address": "19780 Park Drive",
      "city": "Galesville",
      "state": "Wisconsin",
      "image": "image url",
      "createdAt": "2024-11-19 20:39:36",
      "updatedAt": "2024-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name must be less than 50 characters",
        "date": "Date cannot be in the past",
        "description": "Description is required",
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required"
      }
    }
    ```

- Error response: Couldn't find a Show with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Show couldn't be found"
    }
    ```

### Delete a Show

Delete an existing show.

- Require Authentication: true
- Require proper authorization: Show must belong to the current user
- Request

  - Method: DELETE
  - Route path: /shows/:showId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Show with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Show couldn't be found"
    }
    ```

## SWAPMEETS

### Get all Swap Meets

Returns all the swap meets.

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /swapMeets
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "SwapMeets": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Beaver Pigeon & Bantam Poultry Swap",
          "date": "2025-02-19",
          "description": "Must have health papers and solid bottoms on all cages/carriers.",
          "address": "503 N Jackson Ave",
          "city": "Jefferson",
          "state": "Wisconsin",
          "image": "image url",
          "createdAt": "2024-11-19 20:39:36",
          "updatedAt": "2024-11-19 20:39:36",
          "Owner": {
            "id": 1,
            "firstName": "Demo",
            "lastName": "Testing",
            "email": "demo@user.io"
          }
        }
      ]
    }
    ```

### Get all Swap Meets owned by the Current User

Returns all the swap meets owned (created) by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /user/swapMeets
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "SwapMeets": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Beaver Pigeon & Bantam Poultry Swap",
          "date": "2025-02-19",
          "description": "Must have health papers and solid bottoms on all cages/carriers.",
          "address": "503 N Jackson Ave",
          "city": "Jefferson",
          "state": "Wisconsin",
          "image": "image url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get details of a Swap Meet from an id

Returns the details of a swap meet specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /swapMeets/:swapMeetId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Beaver Pigeon & Bantam Poultry Swap",
      "date": "2025-02-19",
      "description": "Must have health papers and solid bottoms on all cages/carriers.",
      "address": "503 N Jackson Ave",
      "city": "Jefferson",
      "state": "Wisconsin",
      "image": "image url",
      "createdAt": "2024-11-19 20:39:36",
      "updatedAt": "2024-11-19 20:39:36",
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com"
      }
    }
    ```

- Error response: Couldn't find a Swap Meet with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Swap Meet couldn't be found"
    }
    ```

### Create a Swap Meet

Creates and returns a new swap meet.

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /swapMeets
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Beaver Pigeon & Bantam Poultry Swap",
      "date": "2025-02-19",
      "description": "Must have health papers and solid bottoms on all cages/carriers.",
      "address": "503 N Jackson Ave",
      "city": "Jefferson",
      "state": "Wisconsin",
      "image": "image url"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Beaver Pigeon & Bantam Poultry Swap",
      "date": "2025-02-19",
      "description": "Must have health papers and solid bottoms on all cages/carriers.",
      "address": "503 N Jackson Ave",
      "city": "Jefferson",
      "state": "Wisconsin",
      "image": "image url",
      "createdAt": "2024-11-19 20:39:36",
      "updatedAt": "2024-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name must be less than 50 characters",
        "date": "Date cannot be in the past",
        "description": "Description is required",
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required"
      }
    }
    ```

### Edit a Swap Meet

Updates and returns an existing swap meet.

- Require Authentication: true
- Require proper authorization: Swap Meet must belong to the current user
- Request

  - Method: PATCH
  - Route path: /swapMeets/:swapMeetId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Beaver Pigeon & Bantam Poultry Swap",
      "date": "2025-02-19",
      "description": "Must have health papers and solid bottoms on all cages/carriers.",
      "address": "503 N Jackson Ave",
      "city": "Jefferson",
      "state": "Wisconsin",
      "image": "image url"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Beaver Pigeon & Bantam Poultry Swap",
      "date": "2025-02-19",
      "description": "Must have health papers and solid bottoms on all cages/carriers.",
      "address": "503 N Jackson Ave",
      "city": "Jefferson",
      "state": "Wisconsin",
      "image": "image url",
      "createdAt": "2024-11-19 20:39:36",
      "updatedAt": "2024-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name must be less than 50 characters",
        "date": "Date cannot be in the past",
        "description": "Description is required",
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required"
      }
    }
    ```

- Error response: Couldn't find a Swap Meet with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Swap Meet couldn't be found"
    }
    ```

### Delete a Swap Meet

Delete an existing swap meet.

- Require Authentication: true
- Require proper authorization: Swap Meet must belong to the current user
- Request

  - Method: DELETE
  - Route path: /swapMeets/:swapMeetId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Swap Meet with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Swap Meet couldn't be found"
    }
    ```

## POSTS

### Get all Posts

Returns all the posts.

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /posts
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Posts": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Chicken for Eggs",
          "image": "image url",
          "description": "Do hens need a rooster to lay eggs?",
          "avgRating": 4.5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "Owner": {
              "id": 1,
              "firstName": "Demo",
              "lastName": "Lition"
          }
        }
      ]
    }
    ```

### Get all Posts owned by the Current User

Returns all the posts owned (created) by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /user/posts
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Posts": [
        {
          "id": 1,
          "ownerId": 1,
          "name": "Chicken for Eggs",
          "image": "image url",
          "description": "Do hens Need a Rooster to Lay Eggs?",
          "avgRating": 4.5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get details of a Post from an id

Returns the details of a post specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /posts/:postId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Chicken for Eggs",
      "images": "image url",
      "description": "Do hens Need a Rooster to Lay Eggs?",
      "avgRating": 2.7,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "numReviews": 1
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      },
      "Reviews": [
        {
            "id": 3,
            "ownerId": 2,
            "postId": 1,
            "review": "Eat him. There's no point in keeping a rooster that kills hens.",
            "starRating": 3,
            "createdAt": "2025-01-10T22:51:56.443Z",
            "updatedAt": "2025-01-10T22:51:56.443Z"
        }
      ]
    }
    ```

- Error response: Couldn't find a Post with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post couldn't be found"
    }
    ```

### Create a Post

Creates and returns a new post.

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /posts
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Chicken for Eggs",
      "description": "Do hens Need a Rooster to Lay Eggs?"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Chicken for Eggs",
      "description": "Do hens Need a Rooster to Lay Eggs?",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name must be less than 100 characters",
        "description": "Description is required"
      }
    }
    ```

### Edit a Post

Updates and returns an existing post.

- Require Authentication: true
- Require proper authorization: Post must belong to the current user
- Request

  - Method: PATCH
  - Route path: /posts/:postId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Chicken for Eggs",
      "description": "Do hens Need a Rooster to Lay Eggs?"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "name": "Chicken for Eggs",
      "description": "Do hens Need a Rooster to Lay Eggs?",
      "createdAt": "2024-11-19 20:39:36",
      "updatedAt": "2024-11-20 10:06:40"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name must be less than 100 characters",
        "description": "Description is required"
      }
    }
    ```

- Error response: Couldn't find a Post with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post couldn't be found"
    }
    ```

### Delete a Post

Delete an existing post.

- Require Authentication: true
- Require proper authorization: Post must belong to the current user
- Request

  - Method: DELETE
  - Route path: /posts/:postId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Post with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post couldn't be found"
    }
    ```

## REVIEWS

### Get all Reviews of the Current User

Returns all the reviews written by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /user/reviews
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "ownerId": 1,
          "postId": 1,
          "review": "This was an awesome post! Great informatiom!",
          "starRating": 5,
          "createdAt": "2024-11-19 20:39:36",
          "updatedAt": "2024-11-19 20:39:36",
          "Post": {
            "id": 1,
            "ownerId": 1,
            "name": "Chicken for Eggs",
            "description": "Do hens Need a Rooster to Lay Eggs?",
          }
        }
      ]
    }
    ```

### Get all Reviews by a Post's id

Returns all the reviews that belong to a post specified by id.

- Require Authentication: false
- Request

  - Method: GET
  - Route path: /posts/:postId/reviews
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "ownerId": 1,
          "postId": 1,
          "review": "This was an awesome post! Great informatiom!",
          "starRating": 5,
          "createdAt": "2024-11-19 20:39:36",
          "updatedAt": "2024-11-19 20:39:36",
          "Owner": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          }
        }
      ]
    }
    ```

- Error response: Couldn't find a Post with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post couldn't be found"
    }
    ```

### Create a Review for a Post based on the Post's id

Create and return a new review for a post specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /posts/:postId/reviews
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "review": "This was an awesome post! Great informatiom!",
      "starRating": 5
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "postId": 1,
      "review": "This was an awesome post! Great informatiom!",
      "starRating": 5,
      "createdAt": "2024-11-19 20:39:36",
      "updatedAt": "2024-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "review": "Review text is required",
        "starRating": "Stars must be an integer from 1 to 5"
      }
    }
    ```

- Error response: Couldn't find a Post with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post couldn't be found"
    }
    ```

### Edit a Review

Update and return an existing review.

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request

  - Method: PATCH
  - Route path: /reviews/:reviewId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "review": "This was an awesome post!",
      "starRating": 5
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "ownerId": 1,
      "postId": 1,
      "review": "This was an awesome post!",
      "starRating": 5,
      "createdAt": "2024-11-19 20:39:36",
      "updatedAt": "2024-11-20 10:06:40"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "review": "Review text is required",
        "starRating": "Stars must be an integer from 1 to 5"
      }
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Delete a Review

Delete an existing review.

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request

  - Method: DELETE
  - Route path: /reviews/:reviewId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

[https://nodejs.org/]: https://nodejs.org/
[https://github.com/Thao88Bee/PoultryCenter]: https://github.com/Thao88Bee/PoultryCenter
[http://localhost:8000]: http://localhost:8000
[http://localhost:5173]: http://localhost:5173

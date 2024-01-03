# SYNERGY ACADEMY CHALLENGE CHAPTER 6

## Description

Project Overview

This project, developed specifically for the SYNERGY Academy Challenge, introduces a sophisticated REST API designed for comprehensive car management. It incorporates state-of-the-art authentication features, ensuring a secure and reliable user experience.

**Technical Stack**

- **ORM (Object-Relational Mapping)**: Utilizes knex.js, a dynamic and flexible ORM, enabling efficient interaction with the database.
- **Database**: Leverages PostgreSQL within a Docker environment, ensuring robust data management and scalability.
- **Architecture**: Adopts the Service Repository pattern, a modern architectural approach that enhances modularity and maintainability of the codebase.

Detailed instructions for setup and configuration will be provided, ensuring a seamless integration and deployment process for users.

## Technologies

- Node.js
- Express.js
- Knex.js
- Typecript
- Docker

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

First of all you need to clone this project or **download the file**

```bash
git clone https://github.com/TimothySubekti0322/SYNERGY-Batch-6.git
cd Challenge-Chapter-6
```

Then install all the dependencies by simply run this code on the terminal

```bash
  npm install
```

Next, Create a .env file that contains your personal database credential. Copy this code below, paste it on your .env file, change **YOUR_JWT_SECRET_KEY_HERE** with your JWT Secret for encryption

```bash
  JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY_HERE
```

Run this command bellow to create postgres container in docker

```bash
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 postgres
```

Run migration to create database in your local database that using this command bellow

```bash
  npx knex migrate:up
```

or

```bash
  npx knex migrate:latest
```

Then run this command below filled initial data in your database

```bash
  npx knex seed:run
```

then to run the website locally , you need to run this command below

```bash
  npm run dev
```

Now you can run the API Service in http://localhost:8000/

## NOTES

Super Admin Account

**email** : "superadmin@gmail.com"

**password** : "superadmin"

## API Documentation

here i'm created API Documentation using stoplight Element

https://timothysubekti0322.stoplight.io/studio/synergy-challenge-chapter-6?source=dQbuAYdc3_6SCa-NFTu5_

**Download Postman File below**

[Download Postman Collection](https://github.com/TimothySubekti0322/SYNERGY-Batch-6/blob/main/Challenge-Chapter-6/Challenge-Chapter-6.postman_collection.json)

### Get all cars

Retrieve all cars Data

**Authorization: bearer {{token}}**

```bash
  GET /api/cars
```

### Get car by id

Retrieve spesific car data based on id

**Authorization: bearer {{token}}**

```bash
  GET /api/cars/:id
```

### Get available cars

Retrieve all cars that available

**Authorization: bearer {{token}}**

```bash
  GET /api/cars/available
```

### Add Car

add car data into database

**Authorization: bearer {{token}}**

```bash
  POST /api/cars
```

Body Request

```bash
{
  "name": String,
  "cost": Integer,
  "size": ["Small", "Medium", "Large"],
  "available": boolean,
}
```

### Delete Car

Delete spesific car based on id

**Authorization: bearer {{token}}**

```bash
  DELETE /api/cars/:id
```

### Update Car

Delete spesific car based on id

**Authorization: bearer {{token}}**

```bash
  UPDATE /api/cars/:id
```

Body Request

```bash
{
  "name": String,
  "cost": Integer,
  "size": ["Small", "Medium", "Large"],
  "available": boolean,
}
```

### Login

Login as super admin, admin, or member

```bash
  POST api/auth/login/
```

Body Request

```bash
{
  "email": String,
  "password": String
}
```

### Register

Register as a member

```bash
  POST api/auth/register/
```

Body Request

```bash
{
  "email": String,
  "username": String,
  "password": String
}
```

### Register admin

Register an admin. This action just could be perform by super admin

**Authorization: bearer {{token}}**

```bash
  POST api/auth/register-admin
```

Body Request

```bash
{
  "email": String,
  "username": String,
  "password": String
}
```

### Get Profile

Get Profile from current User

**Authorization: bearer {{token}}**

```bash
  POST api/auth/profile
```

## Feedback

If you have any feedback, please reach out to me at velmothy14@gmai.com

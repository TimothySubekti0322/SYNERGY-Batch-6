# Project Title

## Description
Mini Fullstack project that designed to fullfil SYNERGY Academy Challenge. This project will present you a simple CRUD operation to manage your Car rental. I'm using knex.js as an ORM and postgresql as a db. the set up will be explain futher below

## Technologies
- Node.js
- Express.js
- Knex.js
- Typecript
- Cloudinary
- Multer

## Entity Relationship Diagram
![Entity Relationship Diagram](https://res.cloudinary.com/dlx2svkha/image/upload/v1699601354/pgjs4wcw62oy7basnikw.png)
This is the Table Structure of this project. I'm utilizing dbdiagram.io to represent the structure table

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

First of all you need to clone this project or download the file

```bash
git clone https://github.com/TimothySubekti0322/SYNERGY-Batch-6.git
cd Challenge-Chapter-5
```
Then install all the dependencies by simply run this code on the terminal
```bash
  npm install
```

Next, Create a .env file that contains your personal database credential. Copy this code below, paste it on your .env file, change **YOUR_DB_CLIENT_HERE** with your database client, **YOUR_DB_NAME_HERE** with your database name, **YOUR_DB_USER HERE** with your database User, and **YOUR_DB_PASSWORD_HERE** with your database password

```bash
  DB_CLIENT=YOUR_DB_CLIENT_HERE
  DB_NAME=YOUR_DB_NAME_HERE
  DB_USER=YOUR_DB_USER_HERE
  DB_PASSWORD=YOUR_DB_PASSWORD_HERE
```

Run migration to create database in your local database that using this command bellow

```bash
  npx knex migrate:up
```

or

```bash
  npx knex migrate:latest
```

If you want to have dummy data in your database you can do seeding by type this command bellow

```bash
  npx knex seed:run
```

then to run the website locally , you need to run this command below

```bash
  npm run dev
```

Now you can run the website by type http://localhost:8000/ in your browser

## Set Up Database
Before you
## API Reference

#### Get all cars

```http
  GET /api/cars
```
response

```bash
{
  id: "",
  name: "",
  cost: "",
  size: "",
  imageurl: "",
  created_at: "",
  updated_at: ""
}
```

#### Add Car

```http
  POST /api/cars
```

Body Request

```bash
{
  name: "",
  cost: "",
  size: "",
  photo: [object]
}
```

Response

```bash
{
  name: "",
  cost: "",
  size: "",
  imageurl: ""
}
```

#### Update Car

```http
  PATCH /api/cars
```

Body Request

```bash
{
  name: "",
  cost: "",
  size: "",
  photo: [object],
  imgurl: ""
}
```

Response

```bash
{
  name: "",
  cost: "",
  size: "",
  imageurl: ""
}
```

#### Delete Car

```http
  PATCH /api/cars/:id
```

Response

```bash
{
  message: "Success delete articles"
}
```
## Feedback

If you have any feedback, please reach out to me at velmothy14@gmai.com


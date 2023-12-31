# SYNERGY ACADEMY CHALLENGE CHAPTER 7

## Description
Project Overview

This project, developed specifically for the SYNERGY Academy Challenge, introduces a sophisticated Dashboard Admin that integrate front-end with dynamic car data

**Technical Stack**

- **ORM (Object-Relational Mapping)** : Utilizes knex.js, a dynamic and flexible ORM, enabling efficient interaction with the database.
- **Database** : Leverages PostgreSQL within a Docker environment, ensuring robust data management and scalability.
- **Architecture**: Adopts the Service Repository pattern, a modern architectural approach that enhances modularity and maintainability of the codebase.
- **Framework** : The project harnesses React.js as the core framework for crafting the frontend, leveraging its component-based structure and efficient state management. Its synergy with TypeScript and supplementary libraries like Material UI empowers the creation of robust, interactive, and visually appealing user interfaces.

Detailed instructions for setup and configuration will be provided, ensuring a seamless integration and deployment process for users.

## Technologies
- Node.js
- Express.js
- Knex.js
- Typecript
- Docker
- React.js
- Tailwind CSS
- Material UI
- Cloudinary
- Vite


## Features

### For Customers
- **User Page :** A Coming Soon page that will be implemented in next milestone 

### For Admin and Super Admin
- **Table View for Car Data and Order Data :** Provides an interactive and detailed display of car and order information, facilitating efficient data management. Enables administrators to view data in enjoyable way that also allows user to set their own pagination
- **Cars list :** Offers a comprehensive listing of available cars, showcasing essential details for quick reference and management. Enables easy navigation and access to individual car specifications.
- **Add Car :** Facilitates seamless addition of new car entries to the database, empowering administrators to input specific details accurately. Provides a user-friendly interface for smooth and error-free car registration. Additionaly, provide a input image feature for user
- **Update Car :** Enables administrators to modify and update existing car information swiftly and accurately. Streamlines the process of editing car details with a structured and intuitive interface. Additionaly, provide a input image feature for user
- **Delete Car :** Allows for the removal of redundant or outdated car entries from the database effortlessly. Ensures a straightforward process to manage and maintain the car dataset efficiently.







## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

First of all you need to clone this project or **download the file**

```bash
git clone https://github.com/TimothySubekti0322/SYNERGY-Batch-6.git
cd Challenge-Chapter-7
```

**Set Up Backend**

When you arrive at Challenge-Chapter-7 you will find 2 folder there. "frontend" folder and "Backend" folder. in this section we will run the "backend" side

Firstly, go to Backend directory

```bash
cd Backend
```

install all the dependencies by simply run this code on the terminal
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
  npx knex migrate:latest
```

Then run this command below filled initial data in your database

```bash
  npx knex seed:run
```

then to run the Backend service locally , you need to run this command below

```bash
  npm run dev
```

Now you can access the Backend Service in http://localhost:8000/

**Set Up frontend**

Firstly, from the root directory (Challenge-Chapter-7), go to frontend directory

```bash
cd frontend
```

install all the dependencies by simply run this code on the terminal
```bash
  npm install
```

then to run the frontend service locally , you need to run this command below

```bash
  npm run dev
```

now you can access the frontend side in http://localhost:5173/
## NOTES
Super Admin Account

**email**    : "superadmin@gmail.com"

**password** : "superadmin"

-----------------------------------

Super Admin Account

**email**    : "admin1@gmail.com"

**password** : "admin1"

------------------------------------------------------

member Account

**email**    : "member1@gmail.com"

**password** : "member1"


## API Documentation

**Download Postman File below**

[Download Postman Collection](https://github.com/TimothySubekti0322/SYNERGY-Batch-6/blob/main/Challenge-Chapter-7/frontend/Challenge-Chapter-7.postman_collection)






## Feedback

If you have any feedback, please reach out to me at velmothy14@gmai.com


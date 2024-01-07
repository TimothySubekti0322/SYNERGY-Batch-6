# SYNERGY ACADEMY CHALLENGE CHAPTER 8

## Description
Project Overview

Welcome to my last website development project for SYNERGY Challenge! This project utilizes React.js for the front end, Express.js with TypeScript for the back end, and incorporates modern development practices to ensure efficiency, scalability, and maintainability. Our main goals include successful deployment of both the front end and back end, implementation of Continuous Integration/Continuous Deployment (CI/CD) pipelines, and the establishment of a robust testing framework using Jest.

**Technical Stack**

- **Front End :** 
    - Vite + React.js
- **Back End :**
    - Express.js
    - TypeScript
- **Deployment Platforms :**
    - Vercel (Front End)
    - Fly.io (Back End) 


Detailed instructions for setup and configuration will be provided, ensuring a seamless integration and deployment process for users.



## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and run the JEST for testing purpose.

First of all you need to clone this project or **download the file**

```bash
git clone https://github.com/TimothySubekti0322/SYNERGY-Batch-6.git
cd Challenge-Chapter-8
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
Now you can try the testing using JEST by typing the command below in terminal

```bash
  npx jest --coverage
```

#Note : if test are failed, please try to run the JEST again. this can be caused by exceed limit / timeout from testing Post Cars endpoint that use Image upload processing into cloudinary
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







## Deployment

- **Front End :**
    - Deployed on Vercel
    - Live URL : https://synergy-chapter-8-client.vercel.app/

- **Back End :**
    - Deployed on Fly.io
    - Live URL: https://synergy-ch-8-server.fly.dev



## Feedback

If you have any feedback, please reach out to me at velmothy14@gmai.com


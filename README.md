# Bramble

[Bramble Link](https://bramble-idq1.onrender.com/)

## Project Summary

Bramble is an Etsy clone with a mythical twist, users are encouraged to create their own categories, shops, and products with fantastic qualities. This site also features custom AI powered art generation influenced by user input.

## Screenshots

### Landing

![Landing Page](image-1.png)

### Categories

![Categories Page](image.png)

### Products

![Products Page](image-2.png)

### Shops

[Shops Page](image-3.png)

### Create Product

![Create Product](image-4.png)

### Create Shop

![Create Shop](image-5.png)

### Product Details

![Product Details](image-6.png)

### Shop Details

![Shop Details](image-7.png)

## Build Instructions

 - Clone Github Repository
 - npm install in both the frontend and backend directories
 - You will have create a .env file in the backend directory where you will need the following variables:

 ```
 NODE_ENV=development
JWT_SECRET=<secret-here>
JWT_EXPIRES_IN=604800
SCHEMA=db/dev.db
DB_FILE=db/dev.db
AWS_ACCESS_KEY_ID=<key-here>
AWS_SECRET_ACCESS_KEY=<key here>
OPEN_API_KEY=<key here>
GOOGLE_OAUTH_CLIENT_ID=<key here>
GOOGLE_OAUTH_CLIENT_SECRET=<key here>
```

- After you will seed the database by running

```
npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all
```

- You should then be ready to start your backend

```
npm start
```

- and frontend

```
npm run dev
```

- Open up your browser, typically with the vite package this application is using you should see your info at http://localhost:5173/

## Technologies used

![Static Badge](https://img.shields.io/badge/react%20-%20green)
![Static Badge](https://img.shields.io/badge/redux%20-%20blue)
![Static Badge](https://img.shields.io/badge/sequelize%20-%20purple)
![Static Badge](https://img.shields.io/badge/bcrypt%20-%20red)
![Static Badge](https://img.shields.io/badge/cookie-parser%20-%20)
![Static Badge](https://img.shields.io/badge/cors%20-%20)
![Static Badge](https://img.shields.io/badge/csurf%20-%20blue)
![Static Badge](https://img.shields.io/badge/dotenv%20-%20purple)
![Static Badge](https://img.shields.io/badge/express%20-%20blue)
![Static Badge](https://img.shields.io/badge/express-validator%20-%20)
![Static Badge](https://img.shields.io/badge/helmet%20-%20)
![Static Badge](https://img.shields.io/badge/jsonwebtoken%20-%20purple)
![Static Badge](https://img.shields.io/badge/morgan%20-%20blue)
![Static Badge](https://img.shields.io/badge/pg%20-%20red)
![Static Badge](https://img.shields.io/badge/sequelize-cli%20-%20)
![Static Badge](https://img.shields.io/badge/dotenv-cli%20-%20)
![Static Badge](https://img.shields.io/badge/nodemon%20-%20blue)
![Static Badge](https://img.shields.io/badge/sqlite3%20-%20purple)
![Static Badge](https://img.shields.io/badge/vite%20-%20)
![Static Badge](https://img.shields.io/badge/eslint%20-%20blue)

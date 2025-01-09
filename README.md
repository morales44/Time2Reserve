# Time2Reserve 
Time2Reserve is a platform that connects users with a network of restaurants across Spain. Through the platform, users can log in, explore, and save their favorite restaurants. Each restaurant profile provides up-to-date information about its location and offerings

## MICROSERVICES 

### 1. RESTAURANTS MICROSERVICE 
This microservice, built with Node.js and powered by a MongoDB database, handles all operations related to restaurant management.

#### INSTALLATION 
To run the microservice, download or clone the repository and ensure that both MongoDB and Node.js are installed on your system.

You need to download the following dependencies:

**config, axios, dotenv, express, mongodb, mongoose, swagger-jsdoc, swagger-ui-express**

To do this, run the following command:

    npm install config express fs mongodb mongoose dotenv axios swagger-jsdoc swagger-ui-express

#### EXECUTION 
To run the project, execute the following command:

    npm start

#### DOCUMENTATION 
To view the API documentation, start the server and then access it through this [link](http:localhost:8000/api-docs).

### 2. AUTHENTICATION MICROSERVICE 
This microservice, developed with Flask (Python), manages user authentication, registration, and retrieval of user-related data. All information is stored in a MySQL database.

#### INSTALLATION 
To run the microservice, download or clone the repository and ensure that Python is installed on your system.

You need to download the following dependecies:

**fastapi, pydantic, uvicorn, mysql-connector-python, SQLAlchemy, pymysq, PyJWT, cryptography, python-dotenv, python-multipart**

To do this run the following command and you need to have the database in your computer:

    pip install -r requirements.txt

#### MAC USER
To create the database run the next command:

    mysql -u root -p < ./db/db.sql

#### WINDOWS USER

To create the database run the next command:

    mysql -u root -p < .\db\db.sql

Once completed, you will be prompted to enter a password. Use the root user's password **(normally *root*)**

#### EXECUTION ▶️
To run the project, simply execute the following command:
    
    uvicorn main:app --reload

## GATEWAY

The gateway is the component of the application responsible for routing calls from the frontend to the appropriate backend services.

#### INSTALLATION

To run the application, download or clone the repository and ensure that Node.js is installed on your system.

Next, install the following dependencies:

**http-proxy**

To do this, run the following command:

    npm install http-proxy

#### EXECUTION 

To run the project, simply execute the following command:
    
    node gateway.js

## FRONTEND 
The frontend of this project is a web application built with React, a popular JavaScript library known for creating interactive user interfaces and reusable components.

#### EXECUTION 
To run the project, simply execute the following command:

    npm start
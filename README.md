# Haushaltsverwaltung

This is a MEAN stack web application that tracks errors of applications. 
An API is also available that can be used by applications to send error messages for example in Java through the class HttpUrlConnection.
Errors are sorted by date descending. 

![Screenshot of Web Application Error Tracker](https://raw.githubusercontent.com/a-dridi/Error-Tracker/master/screenshot1.PNG)

The application needs Angular, Express JS, NodeJS and Mongo Database. All needed dependencies are saved in the package.json in the frontend and backend folders. 

## Configuration

Please adjust the file Server.js  in the folder "backend" to your server settings. 

Error Report Server: Do also copy the file credentials.txt_template to credentials.txt with the adjusted settings for the error report server.

## Run
To start the application directly. You need to have NodeJS and MongoDB installed.

"server.js" production file is in the root of this repository. As well as other production versions of backend files that are needed for NodeJS server. 

**Start Database server (In Windows):**
`bin/mongod.exe`

**Start backend server:**
`cd backend`
`npm run dev`

**Start Frontend server:**
`cd frontend`
`ng serve --open`

## API

The id field of MongoDB is used to reference an error message. 

- Get all error messages - GET request:
`GET /api/errors`

- Get error message for a certain ID - GET request:
`GET /api/errors/ID`

- Add error message - POST request:
`POST /api/errors/add`
```
{
    "title": "NullPointerException",
    "date": "2020-03-18T17:00:00.000Z",
    "application": "Application Abc",
    "description": "NullPointerException in function loadData - Line number 32"
}
```
If you define no date, then the current date and time is added.

- Delete error message of a certain ID - GET request:
`GET /api/errors/delete/ID`


- Update error message of a certain id - POST request:
`POST /api/errors/update/ID`
```
{
    "title": "NullPointerException",
    "date": "2020-03-18T17:00:00.000Z",
    "application": "Application Def",
    "description": "NullPointerException in function loadData - Line number 12"
}
```
## Installation (Deployment)

There are docker files for the frontend and backend server. Please use the file docker-compose.yaml to start this application in Docker containers. You need to install docker-ce and docker-compose.
Start and build the Docker container with this command:
`docker-compose up --build -d`

## Authors

* **A. Dridi** - [a-dridi](https://github.com/a-dridi/)


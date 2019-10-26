# TellUS Forum 
## https://tellusbg.herokuapp.com/

# Node.js Applications: Teamwork Assignment  - Team Express 8  - TellUS

This document describes the teamwork assignment for Telerik Academy students in "Web applications with Node.js" course

## Project Description

The project is a classic Node.js web application - forum, for basically everything.
The application is module based and object-oriented. It has the following structure:
- Home page
- Login page
- Register page
- About bar
- Multiple category pages

Visitors and users can go trough the app and view the content, but have to be registered to add Posts or 
to write comments. The front page of the Forum has a realtime chat for all registered user, that are online.

## Project Members

| Team member         | Email                       | Username          |    Tasks                                              |
| ------------        | -------                     | :------:          | -------------------------                             |
| Martin Kamenov      | --------------------------  | martin.kamenov    | Database, Passport, MVC, Unit and Supertests, other   |
| Georgi Grozdanov    | grozdanovgg@gmail.com       | grozdanovgg       | Graphic design, Websocket, Selenium test, other       |

## Links

[GitHub](https://github.com/grozdanovgg/node-js-app)
[AWS](https://github.com/grozdanovgg/node-js-app)
[Heroku](https://tellusbg.herokuapp.com/)

## General Requirements Covered

### Application Back-end (Server)

- The application should have a:
    - public part (accessible without authentication)
    - private part (available for registered users)
- Public dynamic web pages
- Private (authenticated) dynamic web pages
- Public RESTful routes
- Private (authenticated) route
- Use Express for the server
    - Use an MV-* pattern
- Use MongoDB
- Data layer for accessing the database
- Useint Passport for managing **users**
- Implement WebSockets

### Application front-end

- Using Bootstrap
- Responsive design
- **Error handling** and **data validation** when invalid data is entered
- Use of modals
- Usable UI

### Testing

- Unit tests
- Functional tests with Selenium
- integration tests for AJAX routes with Supertest

### Deployment in Amazon Web Services (AWS)

- Deploying the application in AWS
- Using MongoDB from AWS

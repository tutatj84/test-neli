# Todo App

This is a demo app of me in Nelisorfwares. The main business of this project is to make an Todo app that users can arrange their work and status of current work or just to take note of their goal need to be done.
Tech stack: Front-end (ReactJS) and back-end (ExpressJS/ApolloServer/SQL)

You can follow the guide below to run Todo app. Have fun!!!

# Pre-setup

You need to install Docker on your computer in order to run the database MySQL

- Window (https://docs.docker.com/desktop/windows/install/)
- OSX (https://docs.docker.com/desktop/mac/install/)

Then in a terminal, run the following command to create and run the database.

```
docker run --name test-neli -p 52000:3306 -e MYSQL_DATABASE=neli -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7
```

# Run the back-end

Make sure you have NodeJS installed.

```
cd back-end && npm i && node index.js
```

# Run the front-end

Make sure you have NodeJS installed.

```
cd front-end && npm i && npm start
```

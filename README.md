# Backend for task-list-app
---
# MongoDB setup:
## Running mongoDB on docker:
- ### Pull the latest mongodb image
    ```docker pull mongo:latest```
- ### Create and run a docker container open on the port 27017 in detached mode
    ```docker run -d -p 27017:27017 --name=<container-name> mongo:latest```
- ### You can run this to connect to the database from CLI
    ```docker exec -it <container-name> mongosh ```

###### Replace \<container-name\> with the name of your container

## Creating a user:
- ### You can create a DB user by connecting to the database through a CLI and using this command:
    ```db.createUser({ user: "admin", pwd: "nimda", roles: ["readWrite"] }, { w: "majority" , wtimeout: 5000 })```

## Creating a database:
- ### To create a database you would use this command:
    ```use <database-name>```
###### Replace \<database-name\> with the name of your database

## Connecting to the database:
- ### You can connect to the database from your express server using the db URI:
    ```mongodb://<username>:<password>@127.0.0.1:27017/<database-name>?directConnection=true```
###### Replace the fields in \<\> with the actual field values

## MongoDB setup:
 - ### Pull the latest mongodb image
   ```docker pull mongo:latest```
 - ### Create and run a docker container open on the port 27017 in detached mode
   ```docker run -d -p 27017:27017 --name=<container-name> mongo:latest```
 - ### You can run this to connect to the database from CLI
   ```docker exec -it <container-name> mongosh ```

   ##### Replace \<container-name\> with the name of your container

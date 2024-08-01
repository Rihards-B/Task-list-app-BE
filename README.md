# Backend for task-list-app

## MongoDB setup:
 - ### Pull the latest mongodb image
   ```docker pull mongo:latest```
 - ### Create and run a docker container open on the port 27017 in detached mode
   ```docker run -d -p 27017:27017 --name=<container-name> mongo:latest```
 - ### You can run this to connect to the database from CLI
   ```docker exec -it <container-name> mongosh ```

   ##### Replace \<container-name\> with the name of your container
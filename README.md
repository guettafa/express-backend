# Products API with ExpressJS

A simple REST API made with expressJS

# Requirements

- NodeJS
- npm / yarn
- openssl

# Installation

1. Clone Repo 
```sh
git clone https://github.com/guettafa/express-backend.git
```

2. Install dependencies on your machine
```sh
# on root of project
npm install 
```

### Enable HTTPS
#### DONT FORGET TO UNCOMMENT THE HTTPS PART IN src/index.ts

3. Generate Cert + Key for HTTPS
```sh
# Execute this command in project root
openssl req -nodes -new -x509 -keyout certs/server.key -out certs/server.cert
```

## Create .env file
The .env.prod & .env.test file should be in project root. 

### .env.prod
```sh
# Free to you to change values by anything you want
DB_CONNECTION=mongodb+srv://username:password@cluster0.4o8io.mongodb.net/prod_db?retryWrites=true&w=majority&appName=Cluster0
SECRET_KEY=k3llyR0s3tr1ckster 
PORT=3000
NODE_ENV=prod
```
### .env.test
```sh
DB_CONNECTION=mongodb+srv://username:password@cluster0.4o8io.mongodb.net/test_db?retryWrites=true&w=majority&appName=Cluster0
SECRET_KEY=SecretKeyForTest 
PORT=4000
NODE_ENV=test
```

# Start 
Execute command `npm start` on project root to start the server

```sh
npm start 
```

# Run Tests with Jest + SuperTest
```sh
# it will generate a coverage report in /tests/coverage/
npm run test:unit
```

# Run Load Tests with Artillery
```sh
# it will generate a .json file as report in /tests/load/
npm run test:load
```

# Look by yourself !
You can check if everything worked as planned by going at `https://localhost:3000`
You can even check all endpoints by visiting `https://localhost:3000/api/v1/api-docs`

![swagger](assets/swagger.png)

## Features

- JWT Authentication
- CRUD operations
- Middleware for error handling
- Input validation
- Simple logging
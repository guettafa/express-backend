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

3. Generate Cert + Key for HTTPS
```sh
# Execute this command in project root
openssl req -nodes -new -x509 -keyout certs/server.key -out certs/server.cert
```

## Create .env file
The .env file should be in project root. 

```sh
# Free to you to change values by anything you want
SECRET_KEY=k3llyR0s3tr1ckster 
PORT=3000
```

# Start 
Execute command `npm start` on project root to start the server

```sh
npm start 
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
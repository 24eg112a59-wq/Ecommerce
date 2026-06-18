# Phase 1 – Project Setup and Configuration

## Project Title

ShopEZ – E-Commerce Application

## Objective

The objective of this phase is to set up the development environment and create the initial project structure for the ShopEZ e-commerce platform using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Technologies Used

### Frontend

* React.js
* Vite
* Bootstrap
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* cors
* dotenv

## Project Structure

```text
ShopEZ/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── documentation/
├── templates/
└── README.md
```

## Frontend Setup

### Create React Application

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### Install Required Packages

```bash
npm install axios react-router-dom bootstrap
```

### Run Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Backend Setup

### Initialize Backend

```bash
mkdir backend
cd backend
npm init -y
```

### Install Dependencies

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon
```

### Backend Folder Structure

```text
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── app.js
└── server.js
```

## MongoDB Configuration

MongoDB Atlas is used as the cloud database for storing users, products, carts, and orders.

Environment variables are stored inside:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Express Server Setup

The Express server is configured to:

* Handle API requests
* Connect to MongoDB Atlas
* Enable CORS
* Parse JSON data
* Serve REST APIs

## Expected Output

After successful setup:

* Frontend starts on port 5173
* Backend starts on port 5000
* MongoDB Atlas connection is established
* Project folder structure is created successfully

## Common Errors and Fixes

### Error: MongoDB Connection Failed

Cause:
Incorrect MongoDB connection string.

Fix:
Verify the MONGO_URI value in the .env file.

### Error: Port Already in Use

Cause:
Another application is using the same port.

Fix:
Change the port number in the .env file.

### Error: Module Not Found

Cause:
Dependencies not installed.

Fix:

```bash
npm install
```

## Phase Outcome

The ShopEZ project environment was successfully configured with React, Node.js, Express.js, and MongoDB Atlas. The project structure was created and prepared for further module development.

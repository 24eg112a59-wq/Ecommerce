# Phase 2 – User Authentication Module

## Objective

The objective of this phase is to implement a secure authentication system for ShopEZ. Users can register, log in, access protected routes, and manage their accounts securely using JWT authentication and password hashing.

## Features Implemented

* User Registration
* User Login
* Password Hashing using bcryptjs
* JWT Token Generation
* Protected Routes
* User Role Management
* Authentication Middleware

## Technologies Used

* Express.js
* MongoDB Atlas
* Mongoose
* bcryptjs
* JSON Web Token (JWT)
* dotenv

## Folder Structure

```text
backend/
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
└── utils/
    └── generateToken.js
```

## User Schema

The User model stores user information.

### Fields

* name
* email
* password
* role

Example:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "encrypted_password",
  "role": "user"
}
```

## Registration Process

1. User enters name, email, and password.
2. Password is hashed using bcryptjs.
3. User data is stored in MongoDB.
4. JWT token is generated.
5. Success response is returned.

## Login Process

1. User enters email and password.
2. Credentials are verified.
3. JWT token is generated.
4. User gains access to protected resources.

## JWT Authentication

JWT tokens are generated after successful login.

Example Payload:

```json
{
  "id": "user_id",
  "role": "user"
}
```

The token is attached to requests using:

```text
Authorization: Bearer <token>
```

## Authentication Middleware

The middleware performs:

* Token verification
* User validation
* Route protection

Protected routes can only be accessed by authenticated users.

## API Endpoints

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

### Get User Profile

```http
GET /api/auth/profile
```

## Frontend Authentication

Authentication pages created:

* Login Page
* Register Page

React Context API is used to manage user authentication state.

## Expected Output

* New users can register successfully.
* Existing users can log in.
* Passwords are encrypted.
* JWT tokens are generated.
* Protected routes require authentication.

## Common Errors and Fixes

### Invalid Credentials

Cause:
Incorrect email or password.

Fix:
Verify user credentials.

### JWT Verification Failed

Cause:
Invalid or expired token.

Fix:
Login again and generate a new token.

### User Already Exists

Cause:
Email already registered.

Fix:
Use a different email address.

## Testing

Authentication was tested using:

* Postman
* React Frontend Forms
* Protected API Routes

## Phase Outcome

The User Authentication module was successfully implemented using JWT authentication and bcrypt password hashing. Secure login, registration, and route protection functionalities were achieved.

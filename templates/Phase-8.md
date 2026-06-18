# Phase 8 – API Integration

## Objective

The objective of this phase is to integrate the frontend and backend components of ShopEZ using RESTful APIs. Axios is used to send requests and receive responses between the React frontend and Express backend.

## Technologies Used

* Axios
* React.js
* Express.js
* Node.js
* MongoDB Atlas
* JWT Authentication

## API Integration Overview

The frontend communicates with the backend through REST APIs.

Workflow:

```text
React Frontend
      ↓
Axios Requests
      ↓
Express Backend
      ↓
MongoDB Atlas
      ↓
Response Returned
      ↓
Frontend UI Update
```

## Axios Configuration

Axios is configured centrally for API communication.

File:

```text
frontend/src/utils/apiClient.js
```

Responsibilities:

* API Requests
* Token Management
* Error Handling
* Response Processing

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

### Get Profile

```http
GET /api/auth/profile
```

## Product APIs

### Get All Products

```http
GET /api/products
```

### Get Product Details

```http
GET /api/products/:id
```

### Search Products

```http
GET /api/products?search=keyword
```

## Cart APIs

### Add Product

```http
POST /api/cart/add
```

### Get Cart

```http
GET /api/cart
```

### Update Quantity

```http
PUT /api/cart/update/:productId
```

### Remove Product

```http
DELETE /api/cart/remove/:productId
```

## Order APIs

### Create Order

```http
POST /api/orders
```

### View Orders

```http
GET /api/orders/myorders
```

### Order Details

```http
GET /api/orders/:id
```

## Admin APIs

### Manage Products

```http
POST /api/admin/products
PUT /api/admin/products/:id
DELETE /api/admin/products/:id
```

### Manage Orders

```http
GET /api/admin/orders
PUT /api/admin/orders/:id/status
```

### Manage Users

```http
GET /api/admin/users
```

## JWT Integration

Protected requests include:

```text
Authorization: Bearer <token>
```

The token is stored after successful login and attached to every protected API request.

## Error Handling

Common API responses:

### Success

```json
{
  "success": true,
  "message": "Operation completed successfully"
}
```

### Error

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

## Expected Output

* Frontend successfully communicates with backend.
* Authentication APIs work correctly.
* Product APIs return data properly.
* Cart updates dynamically.
* Orders are created successfully.
* Admin APIs function securely.

## Common Errors and Fixes

### Network Error

Cause:
Backend server not running.

Fix:
Start backend server.

### CORS Error

Cause:
CORS not configured.

Fix:
Enable CORS middleware in Express.

### Unauthorized Error

Cause:
JWT token missing.

Fix:
Login again and send token in request headers.

## Testing

Testing performed using:

* Postman
* Browser Developer Tools
* React Frontend

## Phase Outcome

Frontend and backend integration was completed successfully. All modules communicate efficiently through REST APIs, providing a seamless user experience.

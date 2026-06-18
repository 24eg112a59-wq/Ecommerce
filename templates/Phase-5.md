# Phase 5 – Order Module

## Objective

The objective of this phase is to implement the Order Management module in ShopEZ. This module enables users to place orders, provide shipping details, select payment methods, and view order history.

## Features Implemented

* Place Order
* Checkout Process
* Shipping Address Management
* Payment Method Selection
* Order History
* Order Status Tracking
* Total Price Calculation

## Technologies Used

* React.js
* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Axios

## Folder Structure

```text
backend/
├── controllers/
│   └── orderController.js
├── models/
│   └── Order.js
├── routes/
│   └── orderRoutes.js
└── middleware/
    └── authMiddleware.js
```

## Order Schema

The Order model stores complete order information.

### Fields

* userId
* products
* address
* paymentMethod
* totalPrice
* status

Example:

```json
{
  "userId": "64abc123",
  "products": [
    {
      "productId": "64xyz456",
      "quantity": 2
    }
  ],
  "address": "Hyderabad, Telangana",
  "paymentMethod": "Cash on Delivery",
  "totalPrice": 5998,
  "status": "Pending"
}
```

## Order Workflow

### Step 1: Checkout

User proceeds from cart to checkout page.

### Step 2: Enter Shipping Address

User provides delivery information.

### Step 3: Select Payment Method

Available options:

* Cash on Delivery
* Credit Card
* Debit Card
* UPI

### Step 4: Place Order

Order details are stored in MongoDB Atlas.

### Step 5: Order Confirmation

Order status is initialized as:

```text
Pending
```

## API Endpoints

### Create Order

```http
POST /api/orders
```

### Get User Orders

```http
GET /api/orders/myorders
```

### Get Order Details

```http
GET /api/orders/:id
```

### Update Order Status

```http
PUT /api/orders/:id/status
```

## Frontend Implementation

Pages Developed:

* Checkout Page
* Order Confirmation Page
* Order History Page
* Orders Dashboard

## Expected Output

* Orders placed successfully.
* Shipping information saved.
* Payment method selected.
* Order history displayed correctly.
* Order status tracked successfully.

## Common Errors and Fixes

### Order Creation Failed

Cause:
Missing required fields.

Fix:
Provide address, products, and payment information.

### Invalid User Authentication

Cause:
JWT token missing.

Fix:
Login again and generate a valid token.

### Order Not Found

Cause:
Invalid order ID.

Fix:
Verify order exists in MongoDB Atlas.

## Testing

Testing performed using:

* Postman API Testing
* MongoDB Atlas Verification
* Frontend Checkout Process

## Phase Outcome

The Order Module was successfully implemented. Users can place orders, manage shipping information, track order status, and view their order history efficiently.

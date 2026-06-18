# Phase 4 – Cart Module

## Objective

The objective of this phase is to implement the Cart Management module for ShopEZ. This module allows users to add products to their cart, update quantities, remove products, and view the total cart value before proceeding to checkout.

## Features Implemented

* Add Product to Cart
* View Cart Items
* Update Product Quantity
* Remove Product from Cart
* Calculate Total Price
* User-Specific Cart Management

## Technologies Used

* React.js
* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Axios
* JWT Authentication

## Folder Structure

```text
backend/
├── controllers/
│   └── cartController.js
├── models/
│   └── Cart.js
├── routes/
│   └── cartRoutes.js
└── middleware/
    └── authMiddleware.js
```

## Cart Schema

The Cart model stores products added by users.

### Fields

* userId
* products
* quantity

Example:

```json
{
  "userId": "64abc123",
  "products": [
    {
      "productId": "64xyz456",
      "quantity": 2
    }
  ]
}
```

## Cart Operations

### Add to Cart

Users can add products to their shopping cart.

API Endpoint:

```http
POST /api/cart/add
```

### Get Cart

Retrieve all products currently present in the user's cart.

API Endpoint:

```http
GET /api/cart
```

### Update Quantity

Users can increase or decrease product quantity.

API Endpoint:

```http
PUT /api/cart/update/:productId
```

### Remove Item

Users can remove products from their cart.

API Endpoint:

```http
DELETE /api/cart/remove/:productId
```

## Cart Workflow

1. User selects a product.
2. Clicks "Add to Cart".
3. Product is stored in the user's cart.
4. User can modify quantity.
5. Total price updates automatically.
6. User proceeds to checkout.

## Frontend Implementation

Pages and Components:

* Cart Page
* Product Card Component
* Cart Summary Section
* Quantity Controls
* Remove Button

## Expected Output

* Products added successfully.
* Quantity updates correctly.
* Cart total calculated accurately.
* Products removed successfully.
* User-specific cart maintained.

## Common Errors and Fixes

### Product Not Added

Cause:
Invalid product ID.

Fix:
Verify selected product exists.

### Cart Not Found

Cause:
User authentication failed.

Fix:
Login again and verify JWT token.

### Quantity Update Error

Cause:
Invalid quantity value.

Fix:
Ensure quantity is greater than zero.

## Testing

Testing performed using:

* Postman API Testing
* MongoDB Atlas Verification
* React Frontend Cart Page

## Phase Outcome

The Cart module was successfully implemented. Users can manage products in their cart efficiently, update quantities, remove unwanted items, and prepare orders for checkout.

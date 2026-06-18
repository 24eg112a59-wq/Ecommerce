# Phase 3 – Product CRUD Module

## Objective

The objective of this phase is to develop the Product Management module for ShopEZ. This module enables administrators to create, view, update, and delete products while allowing users to browse available products.

## Features Implemented

* Add Product
* View All Products
* View Product Details
* Update Product
* Delete Product
* Search Products
* Product Inventory Management

## Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* React.js
* Axios

## Folder Structure

backend/

├── controllers/

│ └── productController.js

├── models/

│ └── Product.js

├── routes/

│ └── productRoutes.js

└── middleware/

└── authMiddleware.js

## Product Schema

The Product model stores all product-related information.

### Fields

* name
* description
* image
* category
* price
* stock
* discount

Example Product Document

```json
{
  "name": "Smart Watch",
  "description": "Advanced smart watch with fitness tracking",
  "image": "smartwatch.jpg",
  "category": "Electronics",
  "price": 2999,
  "stock": 50,
  "discount": 10
}
```

## Product CRUD Operations

### Create Product

Administrators can add new products to the platform.

API Endpoint:

```http
POST /api/products
```

### Read Products

Users can view all available products.

API Endpoint:

```http
GET /api/products
```

### Read Single Product

Users can view complete details of a selected product.

API Endpoint:

```http
GET /api/products/:id
```

### Update Product

Administrators can update product information.

API Endpoint:

```http
PUT /api/products/:id
```

### Delete Product

Administrators can remove products from the platform.

API Endpoint:

```http
DELETE /api/products/:id
```

## Search Functionality

Users can search products using:

* Product Name
* Category
* Keywords

Example:

```http
GET /api/products?search=watch
```

## Inventory Management

The system automatically manages product inventory.

Features:

* Track stock quantity
* Update stock after orders
* Prevent ordering unavailable products

## Frontend Implementation

Pages Developed:

* Products Page
* Product Details Page
* Admin Products Page
* Add Product Page
* Edit Product Page

## Expected Output

* Products displayed successfully.
* Product details available.
* Admin can add products.
* Admin can edit products.
* Admin can delete products.
* Search functionality works properly.

## Common Errors and Fixes

### Product Not Found

Cause:
Invalid product ID.

Fix:
Verify product exists in database.

### Validation Error

Cause:
Required fields missing.

Fix:
Provide all mandatory product details.

### Stock Update Failure

Cause:
Database update issue.

Fix:
Verify MongoDB connection and schema validation.

## Testing

Testing performed using:

* Postman API Testing
* MongoDB Atlas Database Verification
* React Frontend Product Pages

## Phase Outcome

The Product CRUD module was successfully implemented. Administrators can manage products efficiently, and users can browse, search, and view product details seamlessly.

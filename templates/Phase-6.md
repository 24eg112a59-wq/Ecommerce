# Phase 6 – Admin Module

## Objective

The objective of this phase is to implement the Admin Management Module for ShopEZ. The administrator has complete control over products, users, orders, and inventory management.

## Features Implemented

* Admin Login
* Dashboard Overview
* Product Management
* User Management
* Order Management
* Inventory Management
* Order Status Updates

## Technologies Used

* React.js
* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Axios

## Admin Responsibilities

The administrator can:

* Add Products
* Edit Products
* Delete Products
* View Users
* View Orders
* Update Order Status
* Monitor Inventory

## Folder Structure

```text
backend/
├── controllers/
│   └── adminController.js
├── routes/
│   └── adminRoutes.js
├── middleware/
│   └── authMiddleware.js
└── models/
    ├── User.js
    ├── Product.js
    └── Order.js
```

## Admin Authentication

Admin login uses JWT authentication.

Role-based authorization is implemented.

Example:

```json
{
  "role": "admin"
}
```

Only users with admin privileges can access admin routes.

## Product Management

### Add Product

```http
POST /api/admin/products
```

### Edit Product

```http
PUT /api/admin/products/:id
```

### Delete Product

```http
DELETE /api/admin/products/:id
```

## User Management

### View Users

```http
GET /api/admin/users
```

Admin can monitor all registered users.

## Order Management

### View Orders

```http
GET /api/admin/orders
```

### Update Status

```http
PUT /api/admin/orders/:id/status
```

Available statuses:

* Pending
* Processing
* Shipped
* Delivered
* Cancelled

## Inventory Management

The inventory system tracks:

* Product Stock
* Low Stock Products
* Out-of-Stock Products

Inventory updates automatically after order placement.

## Admin Dashboard

Dashboard Components:

* Total Users
* Total Products
* Total Orders
* Revenue Summary
* Inventory Overview

## Frontend Pages

* Admin Login Page
* Admin Dashboard
* Product Management Page
* User Management Page
* Order Management Page
* Inventory Page

## Expected Output

* Admin login successful.
* Products managed efficiently.
* Orders monitored successfully.
* User information displayed.
* Inventory tracked correctly.

## Common Errors and Fixes

### Unauthorized Access

Cause:
Non-admin user accessing admin routes.

Fix:
Verify user role.

### Product Update Failed

Cause:
Invalid product ID.

Fix:
Check database records.

### Order Status Update Error

Cause:
Invalid status value.

Fix:
Use supported order statuses.

## Testing

Testing performed using:

* Postman API Testing
* Admin Dashboard Testing
* MongoDB Atlas Verification

## Phase Outcome

The Admin Module was successfully implemented. Administrators can manage products, users, orders, and inventory efficiently through a centralized dashboard.

# Phase 7 – Frontend Development

## Objective

The objective of this phase is to develop the frontend user interface of ShopEZ using React.js and Vite. The frontend provides a responsive and interactive shopping experience for users and administrators.

## Technologies Used

* React.js
* Vite
* Bootstrap
* React Router DOM
* Axios
* Context API

## Features Implemented

### User Features

* Home Page
* Product Listing
* Product Details
* Search Products
* User Registration
* User Login
* Cart Management
* Checkout
* Order History
* User Profile

### Admin Features

* Admin Dashboard
* Product Management
* User Management
* Order Management
* Inventory Monitoring

## Frontend Folder Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

## React Components

### Reusable Components

* ProductCard
* PageTitle
* SectionHeading
* ProtectedRoute
* AdminRoute
* StatCard

## Pages Developed

### User Pages

* Home Page
* Products Page
* Product Details Page
* Cart Page
* Checkout Page
* Order History Page
* Profile Page
* Login Page
* Register Page

### Admin Pages

* Admin Dashboard
* Admin Products Page
* Admin Users Page
* Admin Orders Page
* Admin Inventory Page

## Routing

React Router DOM is used for navigation.

Example Routes:

```text
/
 /products
 /products/:id
 /cart
 /checkout
 /orders
 /profile
 /login
 /register
 /admin
```

## State Management

React Context API is used for:

* Authentication State
* Product State
* Cart State
* User Information

## Responsive Design

Bootstrap framework is used to ensure:

* Mobile Responsiveness
* Tablet Compatibility
* Desktop Compatibility

## Expected Output

* Responsive user interface.
* Smooth navigation between pages.
* Dynamic rendering of products.
* Protected routes for authenticated users.
* Admin dashboard accessibility.

## Common Errors and Fixes

### Blank Page

Cause:
Incorrect route configuration.

Fix:
Verify React Router setup.

### API Data Not Loading

Cause:
Backend server not running.

Fix:
Start backend server and verify API URLs.

### Bootstrap Styles Missing

Cause:
Bootstrap not imported.

Fix:
Import Bootstrap CSS in main.jsx.

## Testing

Testing performed using:

* Browser Testing
* Responsive Design Testing
* Route Navigation Testing

## Phase Outcome

The frontend of ShopEZ was successfully developed using React.js and Bootstrap. Users and administrators can interact with the application through a modern, responsive, and user-friendly interface.

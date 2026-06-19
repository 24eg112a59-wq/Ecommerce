1. Introduction
Project Title
ShopEZ – E-Commerce Platform
Team Members
A.Snehith

2. Project Overview
Purpose
ShopEZ is a MERN Stack based E-Commerce platform that enables users to browse
products, manage carts, place orders, and allows administrators to manage products,
inventory, users, and orders.
Goals
 Online shopping platform
 Secure authentication
 Product management
 Cart management
 Order processing
 Admin dashboard
Features
User Features
 Registration
 Login / Logout
 Browse Products
 Search Products
 Product Details
 Add to Cart
 Update Cart
 Checkout
 Place Orders
 Order History
 User Profile
Admin Features
 Admin Login
 Add Product
 Update Product
 Delete Product

 Manage Inventory
 View Users
 Manage Orders

3. Architecture
Frontend Architecture
React (Vite)
│
├── Components
├── Pages
├── Services (Axios)
├── Routing
└── Bootstrap UI
Backend Architecture
Node.js
│
Express.js
│
Controllers
│
Services
│
Models
│
MongoDB Atlas
Database Architecture
Collections:
Users
{
&quot;_id&quot;:&quot;&quot;,
&quot;name&quot;:&quot;&quot;,
&quot;email&quot;:&quot;&quot;,
&quot;password&quot;:&quot;&quot;,
&quot;role&quot;:&quot;user/admin&quot;
}
Products
{
&quot;_id&quot;:&quot;&quot;,
&quot;name&quot;:&quot;&quot;,

&quot;description&quot;:&quot;&quot;,
&quot;image&quot;:&quot;&quot;,
&quot;category&quot;:&quot;&quot;,
&quot;price&quot;:0,
&quot;stock&quot;:0,
&quot;discount&quot;:0
}
Cart
{
&quot;_id&quot;:&quot;&quot;,
&quot;userId&quot;:&quot;&quot;,
&quot;products&quot;:[],
&quot;quantity&quot;:0
}
Orders
{
&quot;_id&quot;:&quot;&quot;,
&quot;userId&quot;:&quot;&quot;,
&quot;products&quot;:[],
&quot;address&quot;:&quot;&quot;,
&quot;paymentMethod&quot;:&quot;&quot;,
&quot;totalPrice&quot;:0,
&quot;status&quot;:&quot;Pending&quot;
}

4. Setup Instructions
Prerequisites
 Node.js
 MongoDB Atlas Account
 VS Code
 Git
Backend Setup
mkdir server
cd server
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install nodemon --save-dev
Frontend Setup

npm create vite@latest client -- --template react
cd client
npm install
npm install axios react-router-dom bootstrap
Environment Variables
server/.env
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=shopezsecret

5. Folder Structure
ShopEZ
│
├── client
│ ├── public
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── services
│ │ ├── routes
│ │ ├── App.jsx
│ │ └── main.jsx
│
├── server
│ ├── config
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── utils
│ ├── server.js
│ └── .env

6. Running the Application
Backend
cd server
npm run dev
Expected:

Server running on port 5000
MongoDB Connected
Frontend
cd client
npm run dev
Expected:
Local: http://localhost:5173

7. API Documentation
Authentication
Register
POST /api/auth/register
Request
{
&quot;name&quot;:&quot;John&quot;,
&quot;email&quot;:&quot;john@gmail.com&quot;,
&quot;password&quot;:&quot;123456&quot;
}
Response
{
&quot;message&quot;:&quot;User registered successfully&quot;
}

Login
POST /api/auth/login
Response
{
&quot;token&quot;:&quot;jwt_token&quot;
}

Products
Get All Products

GET /api/products
Get Single Product
GET /api/products/:id
Add Product (Admin)
POST /api/products
Update Product
PUT /api/products/:id
Delete Product
DELETE /api/products/:id

Cart
GET /api/cart
POST /api/cart
PUT /api/cart/:id
DELETE /api/cart/:id

Orders
POST /api/orders
GET /api/orders
GET /api/orders/history

8. Authentication
Security Mechanism
 Password hashing using bcryptjs
 JWT-based authentication
 Protected routes using middleware
 Role-based authorization
Authentication Flow
Login
↓
Verify Credentials
↓
Generate JWT
↓

Store Token
↓
Access Protected Routes

9. User Interface
(Add screenshots here)
Suggested screenshots:
1. Home Page
2. Login Page
3. Registration Page
4. Product Listing Page
5. Product Details Page
6. Cart Page
7. Checkout Page
8. Order History Page
9. Admin Dashboard
10. Product Management Page

10. Testing
Testing Strategy
Manual Testing
 Registration Testing
 Login Testing
 Product Testing
 Cart Testing
 Checkout Testing
 Admin Testing
API Testing
Tool:
 Postman
Test Cases:
Module Expected Result
Register User Created
Login JWT Generated

Product CRUD Success
Cart Updated
Order Created

11. Screenshots / Demo
Include:
 Application screenshots
 GitHub Repository Link
 Deployment Link (Vercel/Render)

12. Known Issues
 No online payment integration (current version)
 Image upload stored locally
 No email notifications

13. Future Enhancements
 Razorpay Integration
 Stripe Integration
 Product Reviews
 Wishlist
 AI Product Recommendation
 Email Notifications
 Order Tracking
 Multi-vendor Support
 Mobile App version
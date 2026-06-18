# ShopEZ

ShopEZ is a MERN e-commerce college project built with MongoDB Atlas, Express.js, React.js (Vite), and Node.js.

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
│   ├── .env.example
│   ├── app.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── src/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── styles/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
├── .gitignore
└── README.md
```

## Phase Summary

- Phase 1: backend setup, MongoDB connection, and Express server bootstrap.
- Phase 2: user authentication with JWT and bcryptjs.
- Phase 3: product CRUD and product browsing APIs.
- Phase 4: cart module for add, update, remove, and clear actions.
- Phase 5: order module for checkout, order history, and admin order management.
- Phase 6: admin module for dashboard, users, orders, and inventory.
- Phase 7: React frontend scaffold with routing, layouts, and pages.
- Phase 8: Axios API integration for backend-backed frontend flows.
- Phase 9: UI styling refresh with a stronger visual system.
- Phase 10: testing and deployment steps.

## Quick Start

### Backend

```bash
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Required environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Required frontend environment variable:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Phase 10 Testing Steps

### Manual Backend Checks

- Start the backend and confirm MongoDB connects successfully.
- Open `http://localhost:5000/` and verify the API returns `ShopEZ API is live`.
- Open `http://localhost:5000/api/health` and verify the health response.
- Test authentication with `POST /api/auth/register` and `POST /api/auth/login`.
- Test protected routes using a Bearer JWT token.
- Test product, cart, order, and admin endpoints through Postman or Thunder Client.

### Manual Frontend Checks

- Start the frontend and confirm the Vite dev server opens on `http://localhost:5173`.
- Verify home, products, cart, checkout, orders, profile, and admin routes render.
- Confirm login and register flows work with the backend API.
- Confirm cart actions, checkout, and admin inventory/product controls update correctly.

### Recommended Validation Commands

```bash
cd backend
node --check server.js
node --check app.js

cd frontend
npm run build
```

### Expected Test Output

- Backend responds with JSON messages and valid status codes.
- Frontend builds successfully with Vite.
- Protected routes redirect unauthenticated users to login.
- Admin routes are accessible only to users with `role=admin`.

## Phase 10 Deployment Steps

### Backend Deployment

- Push the backend code to GitHub.
- Create a MongoDB Atlas cluster and allow network access.
- Set production environment variables on your host.
- Deploy the backend to a Node.js-capable host such as Render, Railway, or Cyclic.
- Use the host-provided URL as the production `VITE_API_BASE_URL` in the frontend.

### Frontend Deployment

- Build the frontend with `npm run build`.
- Deploy the `frontend` folder to Vercel or Netlify.
- Set `VITE_API_BASE_URL` to the deployed backend API URL.
- Redeploy after environment changes.

### Production Checklist

- `MONGO_URI` points to MongoDB Atlas.
- `JWT_SECRET` is strong and unique.
- `CLIENT_URL` matches the deployed frontend origin.
- CORS is configured to allow the frontend domain.
- The frontend points to the production backend API URL.

## Common Errors and Fixes

- `MONGO_URI is not defined`: add the backend `.env` file and set the Atlas connection string.
- `Network Error` in the frontend: confirm the backend is running and `VITE_API_BASE_URL` is correct.
- `CORS policy` errors: update `CLIENT_URL` to match the frontend origin.
- `Invalid token`: log in again and clear stale browser storage.
- `Build failed`: ensure dependencies are installed in the correct folder before running `npm run build`.

## Demo Accounts

Use these during local development:

- Admin: `admin@shopez.com` / `Admin@123`
- User: `user@shopez.com` / `User@123`

## Notes

- Backend API routes are mounted under `/api`.
- The frontend uses Axios for API requests and Bootstrap for styling.
- The project follows MVC architecture in the backend.

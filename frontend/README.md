# ShopEZ Frontend - Phase 7

This frontend is built with React, Vite, React Router DOM, Axios, and Bootstrap.

## Included in Phase 7

- App bootstrap and route structure
- Storefront layout and admin layout
- User pages for home, products, cart, checkout, orders, profile, login, and register
- Admin pages for dashboard, users, orders, inventory, and product management
- Demo auth and local store state so the UI runs before API wiring

## Folder Structure

```text
frontend/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── src/
    ├── components/
    ├── context/
    ├── data/
    ├── layouts/
    ├── pages/
    ├── routes/
    ├── styles/
    ├── utils/
    ├── App.jsx
    └── main.jsx
```

## Run Commands

```bash
cd frontend
npm install
npm run dev
```

## Expected Output

- Vite dev server starts on `http://localhost:5173`
- ShopEZ routes load in the browser

## Common Errors and Fixes

- `npm install` fails: verify Node.js is installed and retry.
- Blank page: make sure `src/main.jsx` imports Bootstrap and `App.jsx`.
- Route not found: verify the path matches the router definitions in `src/routes/AppRoutes.jsx`.

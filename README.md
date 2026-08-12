# Fabrinova3D

Fabrinova3D is a React/Vite frontend with an Express and MongoDB backend.

## What is included

- Public catalogue, portfolio, blog, contact, and quote-request pages.
- An admin dashboard protected by JWT authentication.
- Public customer sign-up and login, with dashboard access restricted to administrators and staff.
- One-time protected administrator setup using a private setup key.
- MongoDB models for users, products, services, projects, blog posts, quote requests, contact messages, and newsletter subscribers.

## Run the database locally

Install Docker Desktop, then from the project root run:

```powershell
docker compose up -d mongodb
```

This starts MongoDB at `mongodb://127.0.0.1:27017/fabrinova3d` and preserves data in a Docker volume.

Alternatively, create a MongoDB Atlas cluster and use its connection string as `MONGO_URI`.

## Configure the backend

Copy the example configuration:

```powershell
Copy-Item backend\.env.example backend\.env
```

Open `backend/.env` and set a long, private value for `JWT_SECRET`. Do not commit this file.

## Start the app

In one terminal:

```powershell
cd backend
npm run dev
```

In a second terminal:

```powershell
cd frontend
npm run dev
```

Normal visitors can create accounts at `/signup` and log in at `/login`. These accounts are always `customer` accounts and cannot enter dashboard pages or call protected admin APIs.

To create the first administrator, set a long private `ADMIN_SETUP_KEY` in `backend/.env`, then visit `/admin/setup`. Enter that key only on the administrator setup page. Once an administrator exists, setup closes; use `/admin/login` afterwards.

## Database readiness

The backend only starts after MongoDB connects. Check `http://localhost:5000/api/health` to confirm both the API and database are connected.

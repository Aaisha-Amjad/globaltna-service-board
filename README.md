# GlobalTNA Service Request Board

A full-stack web application where homeowners can post service requests and tradespeople can browse, manage, and update job statuses.

Built as part of the GlobalTNA Full-Stack Developer Intern technical assessment.

## Live URLs

- **Frontend:** https://globaltna-service-board-two.vercel.app
- **Backend:** https://globaltna-service-board-2ij2.onrender.com

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Auth:** JWT (JSON Web Tokens)

---

## Project Structure

globaltna-service-board/
├── backend/ # Express REST API
└── frontend/ # Next.js application

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier)

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
```

Start the development server:

```bash
npm run dev
```

API runs on `http://localhost:5000`

---

### Seed the Database

To populate the database with 10 sample job requests:

```bash
node src/seed.js
```

---

### Run Tests

```bash
npm test
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint             | Description                                                       |
| ------ | -------------------- | ----------------------------------------------------------------- |
| GET    | `/api/jobs`          | Get all jobs (filter by `?category=` or `?status=` or `?search=`) |
| GET    | `/api/jobs/:id`      | Get a single job                                                  |
| POST   | `/api/jobs`          | Create a new job                                                  |
| PATCH  | `/api/jobs/:id`      | Update job status                                                 |
| DELETE | `/api/jobs/:id`      | Delete a job                                                      |
| POST   | `/api/auth/register` | Register a new user                                               |
| POST   | `/api/auth/login`    | Login and receive JWT token                                       |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable     | Description                       |
| ------------ | --------------------------------- |
| `PORT`       | Port the Express server runs on   |
| `MONGO_URI`  | MongoDB Atlas connection string   |
| `JWT_SECRET` | Secret key for signing JWT tokens |

### Frontend (`frontend/.env.local`)

| Variable              | Description                     |
| --------------------- | ------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the Express backend |

---

## Features

- [x] Post a new service request
- [x] Browse all open job requests
- [x] Filter by category and status
- [x] Keyword search across title and description
- [x] View full job details
- [x] Update job status
- [x] Delete a job request
- [x] JWT authentication
- [x] API integration tests
- [x] Database seed script

---

## Live URLs

- **Frontend:** coming soon
- **Backend:** coming soon

---

## Author

Aaisha Amjad

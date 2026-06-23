# Swapnil Dinesh — Fresh Produce Trading Website

Full-stack React + Express + MongoDB website for a Dubai-based fresh produce import/export business.

## Stack

| Layer    | Tech                              |
|----------|-----------------------------------|
| Frontend | React 19 · Vite · Tailwind CSS v4 |
| Backend  | Express.js                        |
| Database | MongoDB (Mongoose ODM)            |
| UI       | Framer Motion · Lucide React      |
| 3D Globe | Three.js                          |

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env and set your MONGO_URI
```

**For local MongoDB:**
```
MONGO_URI=mongodb://127.0.0.1:27017/swapnil_dinesh
```

**For MongoDB Atlas:**
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/swapnil_dinesh
```

### 3. Seed the database
```bash
npm run db:seed
```

### 4. Run in development
```bash
# Run both frontend and backend together:
npm run dev:all

# Or separately:
npm run dev          # Vite frontend → http://localhost:5173
npm run dev:server   # Express API  → http://localhost:3001
```

### 5. Build for production
```bash
npm run build
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/api/products` | List / create products |
| PUT/DELETE | `/api/products/:id` | Update / delete product |
| GET/POST | `/api/inquiries` | List / create inquiries |
| PATCH | `/api/inquiries/:id/status` | Update inquiry status |
| GET/POST/PUT/DELETE | `/api/import-countries` | Import country CRUD |
| GET/POST/PUT/DELETE | `/api/export-markets` | Export market CRUD |
| GET/POST/PUT/DELETE | `/api/gallery` | Gallery CRUD |
| GET/POST/DELETE | `/api/certifications` | Certification CRUD |
| GET/PUT | `/api/quality-steps/:id` | Edit quality steps |
| GET/PUT | `/api/content` | Site content key-value |
| GET | `/api/stats` | Dashboard statistics |

## Admin Panel

Visit `/admin` for the admin dashboard. Features:
- Product management (add, edit, delete, toggle active)
- Inquiry management (view, update status, delete, CSV export)

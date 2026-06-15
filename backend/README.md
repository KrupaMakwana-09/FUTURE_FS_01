# Krupa Makwana — Portfolio Backend (MongoDB)

Express 5 + MongoDB (Mongoose) backend for the portfolio contact form.

## Stack
- Node.js 18+, TypeScript 5
- Express 5
- Mongoose (MongoDB ODM)
- Zod validation
- Pino structured logger

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Edit .env and set MONGODB_URI to your connection string
```

### 3. Start dev server
```bash
npm run dev      # runs tsx watch → http://localhost:5000
```

> No migration step needed — MongoDB creates the collection automatically on first form submission.

---

## API Endpoints

### GET /api/healthz
Returns server + database status.
```json
{ "status": "ok", "db": "connected" }
```

### POST /api/contact
Submit a contact message (saved to `contactmessages` collection).

Request body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "Hello!"
}
```

Success (201):
```json
{
  "id": "665abc123def456789012345",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "Hello!",
  "createdAt": "2026-06-06T10:00:00.000Z"
}
```

---

## Project Structure

```
src/
  db.ts                   ← MongoDB connection (Mongoose)
  index.ts                ← Entry point (connects DB, starts server)
  app.ts                  ← Express app setup
  models/
    ContactMessage.ts     ← Mongoose schema + model
  routes/
    contact.ts            ← POST /api/contact
    health.ts             ← GET /api/healthz
    index.ts              ← Router assembly
  lib/
    logger.ts             ← Pino logger
```

---

## Free MongoDB Options

| Provider       | Free Tier              |
|----------------|------------------------|
| MongoDB Atlas  | 512 MB (recommended)   |
| Railway        | Free credit/month      |

### MongoDB Atlas (free, recommended)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → Create free account
2. Create a **free M0 cluster**
3. Create a database user (username + password)
4. Allow your IP (or `0.0.0.0/0` for all IPs)
5. Click **Connect** → **Drivers** → copy the connection string
6. Paste into `.env` as `MONGODB_URI` (replace `<password>` with your password)

---

## Connecting to the Frontend

The frontend proxies `/api` → `http://localhost:5000` in dev mode.

Run both:
```bash
# Terminal 1 — Backend
cd Backend && npm install && npm run dev

# Terminal 2 — Frontend
cd Frontend && npm install && npm run dev
```

# Exercise 9 — Extend the lab project with MySQL (60 min)

The same setup as the MVC lab: **Express + mysql2 + dotenv + Docker Compose**,
with the code already split into routes / controllers / models.
Your job: **add features** — the most likely practical task if the exam gives you the lab project.

## Setup (do this before the exam too!)

```bash
cd starter
docker compose up -d        # starts MySQL 8 and runs db/init.sql the first time
npm install
npm run dev                 # "Connected to MySQL"
```

- DB settings are in `.env` (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
- `db/init.sql` creates `categories` and `products` (12 products, 3 categories) — read it.
- Reset the data: `docker compose down -v` then `docker compose up -d`.
- Port 3306 busy? Change `DB_PORT` in `.env` (e.g. 3307).

Baseline endpoints already work: `GET /api/products`, `GET /api/products/:id`,
`GET /api/products/search/:keyword`, `POST /api/products`, `DELETE /api/products/:id` (soft),
`PUT /api/products/restore/:id`.

## Tasks (each = Model → Controller → Route)

**T1 — Price filter:** `GET /api/products?min=300&max=1000`
- Both optional. Not a number or < 0 → **400**; `min > max` → **400**.
- Use `?` placeholders (`price >= ?`), never string-concatenate the values.

**T2 — Sort:** `GET /api/products?sort=price_asc | price_desc | name`
- Anything else → **400**. Column names **can't** be `?` placeholders, so use a
  **whitelist** object (`{ price_asc: "price ASC", ... }`) — otherwise
  `?sort=price;DROP TABLE products` is SQL injection.

**T3 — Pagination:** `GET /api/products?page=2&limit=5`
- Defaults `page=1`, `limit=10`; `page ≥ 1`, `limit 1–20`, else **400**.
- SQL: `LIMIT ? OFFSET ?` with `offset = (page - 1) * limit`.
- T1–T3 must work **together** in one query (build the `WHERE` list dynamically).

**T4 — Count:** `GET /api/products/count` → `{ "total": 12 }`
- ⚠️ Route order: put it **before** `/products/:id`, or Express treats `count` as an id.

**T5 — New table:** categories (model + controller + **new route file**)
- `GET /api/categories` → all categories
- `GET /api/categories/:id/products` → products in that category using a **JOIN**;
  category doesn't exist → **404**; exists but empty → `[]`
- Mount it in `index.js`: `app.use("/api", categoryRoutes)`

**T6 — Stats:** `GET /api/products/stats` →
`{ total, avg_price, min_price, max_price }` (one query with `COUNT`, `AVG`, `MIN`, `MAX`).

Test everything with `request.rest`.

## Notes
- `req.query` values are **strings** (`"300"`) — convert with `Number()` and check `Number.isNaN`.
- mysql2 returns `DECIMAL` columns as strings (`"299.00"`) — that's normal (you saw this in the lab).
- MySQL's default sorting is case-insensitive, so `sort=name` puts `iPhone 15` between `Denim Jacket` and `JavaScript Basics`.
- Soft-deleted products must never appear in list, count, stats or category results.

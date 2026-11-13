# Exercise 9 — Answers

All changes are in `models/productModel.js`, `models/categoryModel.js`,
`controllers/productController.js`, `controllers/categoryController.js`,
`routes/productRoutes.js`, `routes/categoryRoutes.js` and `index.js`.

## Key ideas the examiner is looking for

1. **Placeholders for values:** `price >= ?`, `LIMIT ? OFFSET ?`, `c.id = ?` — never `${req.query.min}` in SQL.
2. **Whitelist for column names / sort direction** — placeholders can't hold SQL keywords.
3. **Validate `req.query`** (strings!) → 400 before touching the database.
4. **Route order:** `/products/count` and `/products/stats` before `/products/:id`.
5. **New table = new model + controller + route file**, mounted in `index.js`.
6. **JOIN:** `FROM products p JOIN categories c ON p.category_id = c.id`.
7. **Every query keeps `is_deleted = 0`.**
8. **404 vs empty list:** missing category → 404; category with no products → `[]`.

## Expected results (seed data)

| Request | Result |
|---|---|
| `?min=300&max=1000` | 4 products: Wool Scarf 450, Clean Code 890, JavaScript Basics 350, Node.js Handbook 650 |
| `?sort=price_desc&limit=3` | iPhone 17, iPhone 15, Budget Phone |
| `/products/count` | `{ "total": 12 }` (11 after deleting product 8) |
| `/products/stats` | total 12, avg_price 6492.33, min_price 199.00, max_price 37900.00 |
| `/categories/3/products` | Clean Code, Refactoring, JavaScript Basics, Node.js Handbook |
| `/categories/99/products` | 404 |
| `?sort=price;DROP TABLE products` | 400 |

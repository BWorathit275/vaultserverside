# Exercise 12 — Testing Express routes with Jest + supertest (25 min)

> **Not in the slides.** The slides use Jest for plain functions and REST Client / Postman
> for APIs. This combines the two. Do it only after exercises 1–11.

`supertest` sends real HTTP requests to your Express app **inside Jest**, without starting a server —
automated API tests you can rerun with `npm test` (regression testing).

Key idea: `app.js` builds the app **without** `app.listen()` and exports it;
`server.js` is the only file that listens. Tests import `app.js`.

```js
const request = require("supertest");
const res = await request(app).get("/api/books");          // GET
const res2 = await request(app).post("/api/books").send({ title: "X", price: 10 }); // POST JSON
expect(res.status).toBe(200);
expect(res.body).toHaveLength(2);
```

Test functions must be `async` and `await` each request.

## Tasks (in `starter/app.test.js`)

1. `GET /api/books` → 200, 2 books, first one equals `{ id: 1, title: "Clean Code", price: 890 }`
2. `GET /api/books/2` → 200 · `GET /api/books/999` → 404
3. `POST /api/books` valid → 201, title trimmed, then the list has 3 books
4. `POST` without title → 400 · price `"100"` (string) → 400 · price `0` (boundary) → 400
5. `DELETE /api/books/1` → 200, again → 404
6. Use `beforeEach` to create a **fresh app** for each test — why does that matter?

Run: `npm install && npm test`

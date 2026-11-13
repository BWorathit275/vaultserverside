# Exercise 7 — Full exam simulation: Library app (75 min)

Mixes **every topic**: MVC + EJS · bcrypt · session cookies & roles · Jest · API testing.
Work in `starter/` (folders and `configs/data.js` are given). Time yourself.

## Part 1 — Jest (15 min) · `utils/validators.js` + `utils/validators.test.js`

Write the tests **and** the functions:
- `validateUsername(username)` → 4–20 chars, letters/numbers/`_`, starts with a letter
- `validatePassword(password)` → at least 8 chars and contains a number
- `validateBook(book)` → throws `Error("title is required")` if title missing/blank;
  throws `RangeError("copies must be an integer from 0 to 50")`; returns `true` if valid

Cover positive, negative **and boundary** cases (3/4/20/21 chars, 7/8 chars, -1/0/50/51 copies).
Run `npm test`.

## Part 2 — MVC API with auth (40 min)

Structure: `models/` · `controllers/` · `middlewares/auth.js` · `routes/` · `index.js`.
Data lives in `configs/data.js` (`users`, `books`, `SESSIONS`).

| Method | URL | Who | Result |
|---|---|---|---|
| POST | /api/auth/register `{username, password, role?}` | anyone | validate with Part 1 → **400**; taken → **409**; hash with **bcrypt**; **201** (never return the hash) |
| POST | /api/auth/login `{username, password}` | anyone | `bcrypt.compare`; fail → **401** + delete old session + `clearCookie`; ok → `crypto.randomUUID()` session, cookie `sessionId` with `httpOnly`, `secure`, `sameSite: "lax"` |
| POST | /api/auth/logout | anyone | delete session + `clearCookie` |
| GET | /api/auth/me | logged in | `{ id, username, role }` |
| GET | /api/books | anyone | books not deleted |
| POST | /api/books `{title, author, copies}` | **librarian** | `validateBook` → **400**; **201** |
| DELETE | /api/books/:id | **librarian** | soft delete (`is_deleted = 1`); missing → **404** |
| POST | /api/books/:id/borrow | **member** | copies − 1; 0 copies → **409**; missing → **404** |

Write two middlewares in `middlewares/auth.js`:
`requireLogin` (no/unknown session → **401**) and `requireRole(role)` (wrong role → **403**).
Use them in the routes: `router.post("/books", requireLogin, requireRole("librarian"), ...)`.

> Letting anyone register as `librarian` is only for practice — a real app would not allow it.

## Part 3 — EJS view (10 min)

`GET /` renders `views/books.ejs`: "Logged in as **name** (role)" or "Not logged in",
then a table of books, showing **Out of stock** when copies is 0. Use `<%= %>` only.
Static CSS from `public/css/style.css`.

## Part 4 — API testing (10 min)

Run `request.rest` top to bottom (REST Client keeps the cookie between requests).
Check every status code in the table above. In the browser, log in and check
DevTools → Application → Cookies: `HttpOnly` ✓ `Secure` ✓.

> If REST Client doesn't send the cookie back, copy the `sessionId` value from the
> login response's `Set-Cookie` header and add `Cookie: sessionId=<value>` to the next requests.

## Self-check

- [ ] No business logic or data access in routes; controllers never touch arrays directly
- [ ] Passwords only stored as bcrypt hashes; `await` on every bcrypt call
- [ ] Cookie holds only the session ID (role stays on the server)
- [ ] 401 vs 403 used correctly
- [ ] Same error message for "no such user" and "wrong password"

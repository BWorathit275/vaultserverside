# Exercise 8 — Code review & fix: mixed topics (45 min)

`starter/` is a small user app (register, login, profile page, admin stats).
It **runs**, and `npm test` **passes** — but it has **9 bugs** spread across
Jest, API testing, cookies/sessions, bcrypt and EJS.

## Part 1 — Find them (20 min)

Read `server.js`, `utils/rules.js`, `utils/rules.test.js` and `views/profile.ejs`,
and test the API with REST Client / curl. For each bug write:
**File/line · What is wrong · How to reproduce · Fix · Topic**.

Requirements the app should meet:
- Users must be **18 or older** to register; bio is optional, max 100 chars
- Passwords stored only as bcrypt hashes and **never** sent to the client
- Wrong password → 401; a failed login must not leave an old session active
- Only the **server** decides the user's role; session cookie protected from JavaScript
  and sent only over HTTPS
- Not logged in → **401**; logged in but not admin → **403**
- No request should ever cause a **500**
- The profile page must be safe from **XSS** (bios are written by users)

Hints by topic (how many bugs each):
Jest/boundary (1) · API/500 (1) · bcrypt (1) · data exposure (1) ·
cookies & sessions (3) · 401 vs 403 (1) · EJS (1)

## Part 2 — Fix and prove it (25 min)

1. Add the missing **boundary tests** to `rules.test.js` — watch one fail (Red) — then fix (Green).
2. Fix every bug in `server.js` and `profile.ejs`.
3. Re-run your requests (**regression testing**): every requirement above must hold.

**Bonus:** refactor `server.js` into MVC (`routes/`, `controllers/`, `models/`, `middlewares/`)
like exercise 7.

Useful requests: `starter/request.rest`. A fake role cookie in REST Client:
add the header `Cookie: sessionId=<your id>; role=admin`.

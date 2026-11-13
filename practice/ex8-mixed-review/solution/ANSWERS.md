# Exercise 8 — Answer key (9 bugs)

| # | Where | What is wrong | How to reproduce | Fix | Topic |
|---|---|---|---|---|---|
| 1 | `utils/rules.js` `canRegister` | `age > 18` but the requirement is "18 **or older**". The tests only use 25 and 10, so they pass and hide it. | Register with `age: 18` → 400 | `age >= 18`; add boundary tests 17 / 18 (and 100 / 101 for the bio) | Jest, boundary values |
| 2 | `GET /api/users` | Returns the whole user objects, **including password hashes** | GET /api/users → `"password": "$2b$10$..."` | Return only `{ username, role }` | Data exposure (hashes must never leave the server) |
| 3 | `POST /api/login` | `if (bcrypt.compare(...))` **without `await`** — a Promise is always truthy, so **any password logs in** | Login as bob with `"WRONG"` → 200 Welcome | `if (await bcrypt.compare(...))` | bcrypt / async |
| 4 | `res.cookie("role", ...)` + `requireAdmin` | The role is stored in a **cookie the user can edit**, and `requireAdmin` trusts it → anyone can become admin | Log in as bob, send `Cookie: sessionId=…; role=admin` → stats 200 | Don't set a role cookie; check `req.user.role` from the server-side `SESSIONS` | Cookies (never store roles/permissions in cookies) |
| 5 | `res.cookie("sessionId", sessionId)` | No `httpOnly`, `secure`, `sameSite` → JavaScript can read it (XSS can steal it), sent over plain HTTP | DevTools → Cookies: HttpOnly/Secure unticked; `document.cookie` shows it | `{ httpOnly: true, secure: true, sameSite: "lax" }` | Cookie attributes |
| 6 | `POST /api/login` failure path | A failed login **keeps the old session** (same bug as Project I in the slides) | Log in as admin, then a failed login → admin stats still 200 | On failure: `SESSIONS.delete(req.cookies.sessionId)` + `res.clearCookie("sessionId", opts)` | Sessions |
| 7 | `requireAdmin` | Returns **401** for a logged-in non-admin | Bob → admin stats → 401 | Return **403** (authenticated, not authorized) | 401 vs 403 |
| 8 | `PUT /api/profile` | `isValidBio(undefined)` is true (bio optional) but then `req.body.bio.trim()` crashes → **500** | PUT `{}` → 500 | Only update when `bio !== undefined` | API testing (find 500s) |
| 9 | `views/profile.ejs` | `<%- user.bio %>` prints raw HTML → **stored XSS** | Set bio to `<script>alert('XSS')</script>`, open /profile/bob → alert runs | `<%= user.bio %>` (escaped) | EJS / XSS |

Fixed files: `server.js`, `utils/rules.js`, `utils/rules.test.js`, `views/profile.ejs` — each fix
is marked `// FIX n`.

**Why bug 1 matters for the exam:** the original tests pass, but they only test values far from
the boundary. A boundary test at exactly 18 fails on the buggy code (Red) and passes after the fix
(Green) — this is exactly the "Code I vs Code II" password example in the slides.

**Bugs 3 + 4 together** mean anyone could log in as anyone and then make themselves admin —
the most severe problems in this app.

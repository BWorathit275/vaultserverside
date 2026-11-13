# Exercise 3 — Session-cookie login with roles (30 min)

Same idea as Cookies **Project I**. `index.html` and `client.js` are given
(open `index.html` with **Live Server** → http://127.0.0.1:5500).
Complete the TODOs in `starter/server.js`.

Users (in memory): `Admin` (role Admin), `Lecturer` (role Lecturer).
Anyone else, e.g. `Student`, is **not** a valid user.

| Route | Must do |
|---|---|
| `POST /login` `{ "username": "..." }` | Unknown user → **delete any old session**, `clearCookie`, **401**. Known user → `crypto.randomUUID()`, store in `SESSIONS`, set cookie `sessionId` with `secure`, `httpOnly`, `sameSite: "none"`, reply `Authed as <name>` |
| `GET /me` | No/unknown session → **401**; else JSON `{ username, role }` |
| `GET /adminData` | No session → **401**; role not Admin → **403**; Admin → `Authorized: admin data` |
| `POST /logout` | Delete the session on the server, `clearCookie`, reply `Logged out` |

Also check:
- `cors({ origin: "http://127.0.0.1:5500", credentials: true })` + `cookieParser()`
- `client.js` already sends `credentials: "include"` — explain why it is needed.

**Test the bug from the slides**: log in as Admin, then log in as Student (fails),
then click "Admin data" → must be **401**, not the admin data.

Check the cookie in DevTools → Application → Cookies (`HttpOnly` ✓, `Secure` ✓).

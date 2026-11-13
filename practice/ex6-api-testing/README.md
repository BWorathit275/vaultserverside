# Exercise 6 — API Testing: find the bugs (40 min)

`starter/server.js` is a small **To-do Tasks API** (like the lab's todo-list app).
It uses **Basic Auth**. It has **4 planted bugs**. You are the tester:
**don't read the source first** — test it as a black box like in the lab.

Run it: `npm install` → `npm run dev` → http://localhost:3000

Users (password `12345` for all): `user1`, `user2`, `anonymous`

## Endpoints (the "documentation")

| Method | URL | Auth | Expected |
|---|---|---|---|
| GET | /tasks | yes | 200, all tasks; filters `?status=In%20Progress`, `?search=Keep` |
| GET | /tasks/:id | yes | 200 task; **404** if not found |
| POST | /tasks `{ "title": "...", "status": "Draft" }` | yes | **201**; **400** if title missing or not a string; owner = logged-in user |
| PUT | /tasks/:id `{ "title", "status" }` | yes | 200; only the owner may edit (**403** otherwise); **id always comes from the URL**; fields not sent must stay unchanged |
| DELETE | /tasks/:id | yes | 200; only the owner may delete (**403** otherwise) |
| GET | /user/me | yes | 200 `{ username }` |

Any request without valid credentials → **401**.

## Tasks

**1. Basic Auth by hand (5 min)**
- What header does `curl -u user1:12345` send? Work out the Base64 value yourself
  (base64decode.org is fine), then decode `dXNlcjI6MTIzNDU=` — which user is it?
- Why must Basic Auth only be used over HTTPS?

**2. curl (5 min)**
- `GET /user/me` as user1 with `-u`, and again with `-H "Authorization: Basic ..."`
- `GET /tasks` **without** credentials — what status? Use `-i` to see it.
- `GET /tasks` with `-H "Accept: application/json"`

**3. Test plan (10 min)** — write a table with **at least 12 test cases**:
`No | Method | URL | User | Body | Expected status | Expected result`.
Include positive, negative, authorization (other user's task), boundary/odd input
(missing id, wrong type, empty body) and query-string cases.

**4. Execute & report (20 min)** — run your plan with `request.rest`
(or Postman). For every bug, write: **Endpoint · Steps · Expected · Actual · Severity**.
Hint: the lab's assignment was *"Break the API — try to find 500 errors"*.

**Bonus:** fix the bugs in `server.js` and rerun your tests (regression testing).

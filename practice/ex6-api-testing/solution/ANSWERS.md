# Exercise 6 — Answers

## 1. Basic Auth by hand

- `curl -u user1:12345` sends
  `Authorization: Basic dXNlcjE6MTIzNDU=` — the Base64 of `user1:12345`.
- `dXNlcjI6MTIzNDU=` decodes to `user2:12345` → **user2**.
- Base64 is **encoding, not encryption**: anyone who sees the header can decode the
  password instantly. Over HTTPS the whole request (headers included) is encrypted,
  so the credentials can't be read on the network.

## 2. curl

```bash
curl -u user1:12345 http://localhost:3000/user/me
curl -H "Authorization: Basic dXNlcjE6MTIzNDU=" http://localhost:3000/user/me
curl -i http://localhost:3000/tasks                     # HTTP/1.1 401 Unauthorized
curl -u user1:12345 -H "Accept: application/json" http://localhost:3000/tasks
curl -u user1:12345 "http://localhost:3000/tasks?status=In%20Progress"   # quote URLs with ? or &
```

## 3. Test plan

Run them in this order (T12 changes task 2, T15 deletes it). Full requests are in `request.rest`.

| No | Method | URL | User | Body | Expected | Type |
|---|---|---|---|---|---|---|
| T1 | GET | /user/me | user1 | – | 200 `{username:"user1"}` | positive |
| T2 | GET | /tasks | none | – | 401 | auth (negative) |
| T3 | GET | /tasks | user1 + wrong password | – | 401 | auth (negative) |
| T4 | GET | /tasks | user1 | – | 200, 3 tasks | positive |
| T5 | GET | /tasks?status=In%20Progress | user1 | – | 200, only task 1 | query string |
| T6 | GET | /tasks?search=Keep | user1 | – | 200, only task 1 | query string |
| T7 | GET | /tasks/2 | user1 | – | 200 task 2 | positive |
| T8 | GET | /tasks/999 | user1 | – | **404** | negative / boundary |
| T9 | POST | /tasks | user1 | `{title, status}` | 201, owner user1 | positive |
| T10 | POST | /tasks | user1 | `{status}` (no title) | 400 | negative |
| T11 | POST | /tasks | user1 | `{title: 123}` | **400** | negative (wrong type) |
| T12 | PUT | /tasks/2 | user1 | `{status}` only | 200, **title unchanged** | partial update |
| T13 | PUT | /tasks/2 | user1 | `{id:100, ...}` | 200, id still 2 | id from URL |
| T14 | PUT | /tasks/2 | user2 | `{title}` | 403 | authorization |
| T15 | DELETE | /tasks/2 | user2 | – | **403** | authorization |
| T16 | DELETE | /tasks/999 | user1 | – | 404 | negative |

## 4. Bug report

| # | Endpoint | Steps | Expected | Actual | Severity |
|---|---|---|---|---|---|
| 1 | GET /tasks/:id | GET /tasks/999 as user1 | 404 Task not found | **500** Internal Server Error (`task` is undefined → reading `task.id` throws) | Medium |
| 2 | POST /tasks | POST `{ "title": 123 }` | 400 (title must be a string) | **500** (`title.trim is not a function`) | Medium |
| 3 | PUT /tasks/:id | PUT /tasks/2 `{ "status": "In Progress" }` as user1 | title unchanged | **title is removed** (set to `undefined`) — data loss, same kind of bug as "email was deleted" in the lab | High |
| 4 | DELETE /tasks/:id | DELETE /tasks/2 as **user2** (task owned by user1) | 403 Forbidden | **200, task deleted** — no ownership check | **Critical** (authorization) |

Behaviours that are **correct** (not bugs): 401 without/with wrong credentials,
403 when user2 edits user1's task (T14), the id in the PUT body is ignored (T13),
query-string filters work.

**Fixes** (see `server.js`, marked `// FIX`): 404 check in GET by id; `typeof title === "string"`
validation; only assign fields that were sent; owner check before delete.
After fixing, rerun all tests — that is **regression testing**.

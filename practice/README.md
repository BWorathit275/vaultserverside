# Practice Pack — Practical Exam (Jest · MVC · Cookies · bcrypt)

Timed exercises modelled on the labs in the slides. Do each one from the
`starter/` folder **without looking at `solution/`**, then compare.

| # | Exercise | Topic | Suggested time |
|---|----------|-------|----------------|
| 1 | Shipping fee + pass/fail bug hunt | Unit Testing with Jest | 25 min |
| 2 | Refactor a books API into MVC + EJS view | MVC, EJS | 40 min |
| 3 | Session-cookie login with roles (401/403) | Cookies | 30 min |
| 4 | Register / login with bcrypt | Password hashing | 20 min |
| 5 | TDD: validateScore, BMI, isPalindrome, canAccessAdmin | Jest (TDD, matchers) | 30 min |
| 6 | Find 4 planted bugs in a Tasks API (Basic Auth, curl, test plan, bug report) | API Testing | 40 min |
| 7 | **Full exam simulation**: Library app — MVC + bcrypt + session roles + EJS + Jest + REST Client | **All topics** | 75 min |
| 8 | **Code review & fix**: 9 bugs across Jest, API, bcrypt, cookies, 401/403 and EJS | **All topics** | 45 min |

| 9 | Extend the **real lab setup** (Docker MySQL + mysql2 + .env): filter, sort, pagination, count, JOIN, stats | MVC + SQL | 60 min |
| 10 | EJS **partials**, detail page, **HTML forms** (urlencoded, validation, redirect, 404) | MVC View / EJS | 40 min |
| 11 | **Postman**: environment variables, Authorization tab, test scripts, Collection Runner | API Testing | 35 min |
| 12 | Jest + **supertest** route tests — *beyond the slides* | Jest + API | 25 min |

Exercises 7 and 8 mix every topic — the most exam-like. Do them last, timed.

Also:
- **`theory-questions.md`** — ~45 short questions + answer key
- **`worksheet-test-cases.md`** — write positive / negative / boundary test tables (no code) + answers
- **`manual-drills.md`** — DevTools cookies & network, npm/package.json, curl, spot-the-error
- **`snippets.md`** — copy-paste code patterns

## Coverage map — every slide topic and where to practise it

| Slide topic | Practice |
|---|---|
| Bug history, error types (syntax / run-time / logic) | theory A1, manual-drills §5 |
| Testing types, test pyramid, manual vs automated, semver | theory A2–A5, manual-drills §3 (`^` versions) |
| TDD (Red → Green → Refactor) | ex5, ex8 |
| Positive / negative / boundary test design | ex1, ex5, ex7, worksheet |
| Jest setup, test vs describe vs it, AAA, matchers, toThrow | ex1, ex5, ex7, ex8, theory B |
| Project Work: test summary for 5 features | worksheet |
| curl + Accept header, practice APIs | ex6, manual-drills §4 |
| Postman | ex11 |
| REST / SOAP / GraphQL, query strings, status codes | theory C, ex6, ex9 |
| Authentication vs authorization, Basic Auth + Base64, 401 vs 403 | ex6, ex11, ex3, ex7, ex8 |
| PUT id from URL, PUT deleting fields, "find 500 errors" | ex6, ex8, ex11 |
| MVC concept, roles, login flow | theory D, ex2 |
| Refactor lab: configs / routes / controllers / models | ex2, ex7, ex9 |
| MySQL + mysql2 + dotenv + docker-compose, soft delete, uuid | ex9, ex2 |
| EJS tags, loops, conditions, include, res.render, static CSS | ex2, ex7, ex10, theory D |
| Cookies: uses, what not to store, attributes | theory E, ex3, ex7, ex8, manual-drills §1 |
| Session login, credentials: "include", CORS, clearCookie bug fix | ex3, ex7, ex8 |
| Session hijacking demo (rack.session) | manual-drills §1 |
| Plain vs encrypted vs hashed, bcrypt cost/salt/compare | ex4, ex7, ex8, theory F |
| REST Client, nodemon / node --watch, npm scripts | every exercise, manual-drills §3 |

Plus **`theory-questions.md`**: ~45 short questions on every slide topic, with an answer key at the bottom.

## How to run each exercise

```bash
cd ex1-jest/starter
npm install          # installs the packages listed in package.json
npm test             # ex1
npm run dev          # ex2, ex3, ex4  (node --watch)
```

Send requests with the **REST Client** VS Code extension: open the
`request.rest` file and click **Send Request** above each request.

## Rules to practise with

- Internet allowed → you may use the official docs (jestjs.io, expressjs.com,
  ejs.co, npmjs.com/package/bcrypt, MDN). Check with your instructor whether
  AI tools are allowed; don't assume.
- Copy patterns from `snippets.md`, but type the structure yourself at least once.

## Note on the database (ex2)

The labs use MySQL via `mysql2`. To keep this exercise runnable without Docker,
`configs/db.js` here is an **in-memory stand-in** with the same callback shape
(`callback(err, results)`), so the Model → Controller → Route code is written
exactly as in the lab. In the exam, the Model would call `db.query(sql, params, callback)`.

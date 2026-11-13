# Server-Side Web Development — Exam Prep

Study material for the exam topics: **Unit Testing with Jest**, **API Testing**,
**Model-View-Controller (MVC)** and **Cookies** (JWT is not examined).

## Contents

| Path | What it is |
|---|---|
| `cheatsheets/Exam_CheatSheet_TH.pdf` | Full Thai summary of every slide (technical terms in English), tools, and "beyond the slides" notes — 20 pages with contents page |
| `cheatsheets/Exam_CheatSheet.pdf` | Compact English summary — 6 pages |
| `practice/` | 12 timed practice exercises (7 and 8 mix all topics), each with `starter/` and `solution/` — see [practice/README.md](practice/README.md) |
| `practice/theory-questions.md` | ~45 theory questions on all slide topics, with answer key |
| `practice/worksheet-test-cases.md` | Write positive / negative / boundary test tables, with answers |
| `practice/manual-drills.md` | DevTools cookies & network, npm, curl, spot-the-error drills |
| `practice/snippets.md` | Copy-paste code patterns: Jest, Express MVC, EJS, cookies/sessions, bcrypt, REST Client, Postman, curl |

See [practice/README.md](practice/README.md) for a **coverage map** of every slide topic.

## Practice exercises

| # | Exercise | Time |
|---|---|---|
| 1 | Jest: shipping fee, boundary bug hunt, arrays | 25 min |
| 2 | Refactor a Books API into MVC + EJS view | 40 min |
| 3 | Session-cookie login with roles (401/403) | 30 min |
| 4 | Register / login with bcrypt | 20 min |
| 5 | TDD with Jest (functions from the slides) | 30 min |
| 6 | API testing: find 4 planted bugs (Basic Auth, curl, test plan) | 40 min |
| 7 | **Mixed — full exam simulation**: Library app (MVC, bcrypt, session roles, EJS, Jest, REST Client) | 75 min |
| 8 | **Mixed — code review & fix**: 9 bugs across all topics | 45 min |
| 9 | Extend the real lab setup (Docker MySQL, mysql2, .env): filter, sort, paging, JOIN, stats | 60 min |
| 10 | EJS partials, detail page and HTML forms | 40 min |
| 11 | Postman: variables, auth, test scripts, Collection Runner | 35 min |
| 12 | Jest + supertest route tests (beyond the slides) | 25 min |

```bash
cd practice/ex1-jest/starter
npm install
npm test
```

## References

- Jest matchers: jestjs.io/docs/expect and jestjs.io/docs/using-matchers
- Jest async: jestjs.io/docs/asynchronous
- Express routing and `res.cookie`: expressjs.com (Guide → Routing, and the API reference for `res.cookie` and `res.clearCookie`)
- EJS tags: ejs.co
- bcrypt: npmjs.com/package/bcrypt
- Cookies and status codes: MDN, "Using HTTP cookies" and "HTTP response status codes"
- Postman tests: learning.postman.com, "test script examples"

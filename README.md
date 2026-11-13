# Server-Side Web Development — Exam Prep

Study material for the exam topics: **Unit Testing with Jest**, **API Testing**,
**Model-View-Controller (MVC)** and **Cookies** (JWT is not examined).

## Contents

| Path | What it is |
|---|---|
| `cheatsheets/Exam_CheatSheet_TH.pdf` | Full Thai summary of every slide (technical terms in English), tools, and "beyond the slides" notes — 20 pages with contents page |
| `cheatsheets/Exam_CheatSheet.pdf` | Compact English summary — 6 pages |
| `practice/` | 6 timed practice exercises, each with `starter/` and `solution/` — see [practice/README.md](practice/README.md) |
| `practice/theory-questions.md` | ~45 theory questions on all slide topics, with answer key |
| `practice/snippets.md` | Copy-paste code patterns: Jest, Express MVC, EJS, cookies/sessions, bcrypt, REST Client, Postman, curl |

## Practice exercises

| # | Exercise | Time |
|---|---|---|
| 1 | Jest: shipping fee, boundary bug hunt, arrays | 25 min |
| 2 | Refactor a Books API into MVC + EJS view | 40 min |
| 3 | Session-cookie login with roles (401/403) | 30 min |
| 4 | Register / login with bcrypt | 20 min |
| 5 | TDD with Jest (functions from the slides) | 30 min |
| 6 | API testing: find 4 planted bugs (Basic Auth, curl, test plan) | 40 min |

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

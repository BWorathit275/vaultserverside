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

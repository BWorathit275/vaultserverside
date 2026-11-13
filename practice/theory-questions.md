# Theory practice questions (from the slides)

Answer on paper first, then check the **Answer key** at the bottom.
Topics: Testing basics · Jest · API Testing · MVC & EJS · Cookies · bcrypt.

---

## A. Bugs, errors and testing basics

**A1.** Name the error type (syntax / run-time / logic) for each:

```js
// (a)
const total = price * quantity
const discount = total * 0.1;
console.log("Total: " + total - discount);

// (b)
const user = { name: "Ann" age: 20 };

// (c)
function getLength(list) { return list.length; }
getLength(undefined);

// (d)
function isAdult(age) { return age > 18; }   // requirement: 18 and over is adult
```

**A2.** Match each testing type to its description:
Unit · Integration · System · UAT · Regression
1. Checks the software works for the real users
2. Checks that a change did not break something that worked before
3. Tests one function or class in isolation
4. Tests that several units work together
5. Tests the whole system end to end

**A3.** In the test pyramid (Unit → Component → Integration → API → UI), which level is
the fastest and most isolated? Which is the slowest and most integrated?

**A4.** A library is at version `2.4.7`. What is the new version after each change?
(a) a bug fix · (b) a new optional function, old code still works · (c) a function is
removed so old code breaks.

**A5.** Give two reasons to automate tests and one kind of testing that is better done manually.

**A6.** Put the TDD steps in order: *Refactor · Green · Red*. What does each mean?

---

## B. Test case design & Jest

**B1.** Requirement: *"Withdrawals must be between 100 and 20,000 baht."*
(a) List the boundary values you should test.
(b) Give one positive and two negative test inputs.

**B2.** Requirement: *"A password must contain at least 8 characters."*
Which code is correct, and which single test input proves the other one wrong?

```js
// Code I                          // Code II
return password.length > 8;        return password.length >= 8;
```

**B3.** Which matcher would you use?
(a) `getUser()` returns `{ name: "Ann", roles: ["admin"] }`
(b) `getRoles()` should include `"admin"`
(c) `divide(1, 0)` should throw `"Cannot divide by zero"`
(d) `findUser(999)` returns `null`
(e) `getCount()` returns any non-zero number

**B4.** Is each value truthy or falsy? `0` · `"0"` · `""` · `"false"` · `[]` · `null` · `-1` · `NaN`

**B5.** What is wrong with this test, and how do you fix it?

```js
test("throws on empty name", () => {
  expect(registerUser("")).toThrow("Username is required");
});
```

**B6.** A project has `user.test.js` (4 tests), `cart.test.js` (6 tests) and
`sum.test.js` (1 test). What does Jest print for *Test Suites* and *Tests*?

**B7.** Label each line as Arrange, Act or Assert:

```js
const cart = [{ price: 100 }, { price: 50 }];
const total = calculateTotal(cart);
expect(total).toBe(150);
```

**B8.** What is the difference between `describe()`, `test()` and `it()`?

**B9.** Which command installs Jest as a dev dependency, and what must be in
`package.json` so that `npm test` runs Jest?

---

## C. API Testing

**C1.** Name the three API types from the slides. Which one uses XML messages?

**C2.** You run `curl https://icanhazdadjoke.com/` with no `Accept` header.
What format do you get? What header gives JSON?

**C3.** A request has the header `Authorization: Basic YWRtaW46c2VjcmV0`.
(a) What are the username and password? (b) Why is this not secure over plain HTTP?

**C4.** 401 or 403?
(a) No token sent
(b) Logged in as user2, trying to delete user1's task
(c) Wrong password
(d) Logged in as a student, opening the admin page

**C5.** In `GET /tasks?status=In%20Progress&search=Keep`, what are the query-string
parameters and their values? What does `%20` mean?

**C6.** You send `PUT /tasks/1` with body `{ "id": 100, "title": "New" }`. In the lab,
which id is updated and why? You then send a PUT with an empty body and the email
is deleted. Is that a bug? Explain.

**C7.** "Authentication" vs "Authorization": define each in one question.

**C8.** Why does the lab say *"try to find 500 errors"*? What does a 500 usually mean?

---

## D. MVC & EJS

**D1.** Which part (Model / View / Controller) does each job?
(a) Runs `SELECT * FROM products` · (b) Shows the product list in HTML ·
(c) Reads `req.params.id`, decides the status code ·
(d) Works only when another part asks it to

**D2.** Put the login flow in order:
M checks the database · User types in the View · C tells V to show the main page /
error · V sends the data to C · M returns the result to C · C asks M to verify

**D3.** Why must routes use `express.Router()` and end with `module.exports = router`?
What does `app.use('/api', productRoutes)` do to the URLs?

**D4.** What is a *soft delete*? Which column and SQL does the lab use?

**D5.** What does each EJS tag do?
`<%= name %>` · `<%- html %>` · `<% if (ok) { %>` · `<%- include('partials/header') %>`

**D6.** `user.bio` contains `<script>alert(1)</script>`. Which tag is safe to display it
with, and what attack does it prevent?

**D7.** The CSS file is in `public/css/style.css`. What line in `index.js` and what
`<link>` tag are needed?

**D8.** Name three frameworks that follow MVC.

---

## E. Cookies & sessions

**E1.** What is a cookie, and when does the browser send it back to the server?

**E2.** Which of these must **not** be stored in a cookie? Session ID · password hash ·
theme = dark · `isAdmin=true` · credit card number · language = th

**E3.** What does each cookie option do? `httpOnly: true` · `secure: true` · `sameSite: "none"`

**E4.** The client at `127.0.0.1:5500` calls the server at `localhost:3000`.
What must the client `fetch` include, and what must the server's `cors()` include,
for the cookie to be sent?

**E5.** Why does the cookie hold only a **session ID** instead of the user's role?

**E6.** In the herokuapp demo, copying the `rack.session` value into an Incognito
window logs you in. What attack is this, and which option makes it harder?

**E7.** In Project I, a user logs in as Admin, then a "Login as Student" attempt fails,
but the user can still see admin data. Why, and which two lines fix it?

---

## F. Password hashing (bcrypt)

**F1.** Plain text vs encrypted vs hashed passwords: what is the risk of each?

**F2.** In `bcrypt.hash(password, 10)`, what is `10`? Is it the salt? The password length?

**F3.** You hash `"MyPassword123"` twice. Are the hashes equal? Why?
How can `bcrypt.compare` still return `true` for both?

**F4.** How long is a bcrypt hash, and what does it start with?

**F5.** Why do the bcrypt routes use `async` and `await`?

**F6.** In the REST Client extension, how are requests separated in a `.rest` file?

---
---

# Answer key

## A
**A1.** (a) **logic** — string concatenation happens first, so the result is `NaN`/wrong
(needs brackets); the missing `;` on line 1 is fine in JS. (b) **syntax** — missing comma.
(c) **run-time** — `undefined.length` throws while running. (d) **logic** — 18 should be
adult, needs `>=`.

**A2.** Unit–3 · Integration–4 · System–5 · UAT–1 · Regression–2

**A3.** Unit = fastest, most isolated. UI = slowest, most integrated.

**A4.** (a) Patch → `2.4.8` · (b) Minor → `2.5.0` · (c) Major → `3.0.0`

**A5.** Automated: more reliable (no human error), much faster for thousands of
repeated cases. Manual is better for exploratory, usability and ad-hoc testing.

**A6.** **Red** (write a failing test) → **Green** (simplest code to pass) → **Refactor**
(clean up, tests stay green).

## B
**B1.** (a) 99, 100, 101 and 19,999, 20,000, 20,001. (b) Positive: 5,000.
Negative: 50 and 25,000 (also e.g. `"abc"`, -100).

**B2.** Code II is correct. Input with **exactly 8 characters**: Code I returns `false`.

**B3.** (a) `toEqual` · (b) `toContain` · (c) `expect(() => divide(1, 0)).toThrow("Cannot divide by zero")`
· (d) `toBe(null)` (or `toBeNull`) · (e) `toBeTruthy`

**B4.** Falsy: `0`, `""`, `null`, `NaN`. Truthy: `"0"`, `"false"`, `[]`, `-1`.

**B5.** The function runs before `expect` gets it, so the error is thrown outside
the matcher. Wrap it: `expect(() => registerUser("")).toThrow("Username is required")`.

**B6.** `Test Suites: 3 passed, 3 total` · `Tests: 11 passed, 11 total`

**B7.** Line 1 Arrange · line 2 Act · line 3 Assert.

**B8.** `describe` groups related tests (many per file allowed). `test` and `it` are
the same thing — one test case; `it("should ...")` reads like a sentence.

**B9.** `npm install -D jest` (or `--save-dev`); `"scripts": { "test": "jest" }`.

## C
**C1.** REST, SOAP, GraphQL. SOAP uses XML.

**C2.** Plain text (`text/plain`). `-H "Accept: application/json"`.

**C3.** (a) Base64 decodes to `admin:secret`. (b) Base64 is encoding, not encryption —
anyone who sees the request can decode it; use HTTPS.

**C4.** (a) 401 · (b) 403 · (c) 401 · (d) 403

**C5.** `status = "In Progress"`, `search = "Keep"`. `%20` is a URL-encoded space.

**C6.** Task 1 — the id comes from the URL, the body id is ignored (correct
behaviour). Deleting the email when it isn't sent is a **bug** in the lab: missing fields
should stay unchanged or the API should reject the request.

**C7.** Authentication: *who are you?* Authorization: *what can you do?*

**C8.** A 500 means the server crashed on input it didn't handle — almost always a
bug (e.g. no validation, reading a property of `undefined`).

## D
**D1.** (a) Model · (b) View · (c) Controller · (d) Model

**D2.** User types in V → V sends data to C → C asks M to verify → M checks the
database → M returns the result to C → C tells V to show the main page / error.

**D3.** The router holds the routes in a separate file; `module.exports` lets
`index.js` `require` it. `app.use('/api', ...)` prefixes every route in it with `/api`
(`/products` → `/api/products`).

**D4.** The row is kept but hidden: `UPDATE products SET is_deleted = 1 WHERE id = ?`;
queries use `WHERE is_deleted = 0`; restore sets it back to 0.

**D5.** Print escaped value · print raw HTML · run JavaScript without output ·
insert another EJS file.

**D6.** `<%= user.bio %>` — it escapes the HTML, preventing **XSS**.

**D7.** `app.use(express.static('public'))` and
`<link rel="stylesheet" href="/css/style.css">`.

**D8.** Any three of: Express, Django, Flask, Rails, Laravel, CodeIgniter.

## E
**E1.** Small data the browser stores (e.g. a session ID). The browser sends matching
cookies back with each later HTTP request to that server.

**E2.** Must not store: password hash, `isAdmin=true`, credit card number.
OK: session ID, theme, language.

**E3.** `httpOnly` — JavaScript can't read it (`document.cookie`). `secure` — only sent
over HTTPS (localhost excepted). `sameSite: "none"` — allowed on cross-site requests.

**E4.** Client: `credentials: "include"`. Server:
`cors({ origin: "http://127.0.0.1:5500", credentials: true })`.

**E5.** The role is kept on the server (`SESSIONS`); the user can edit cookies, so
storing the role there would let them make themselves admin.

**E6.** Session hijacking — whoever has the session cookie is logged in.
`httpOnly` stops scripts from stealing it; `secure` keeps it off plain HTTP.

**E7.** The failed login left the old Admin `sessionId` cookie and session in place.
Fix: `SESSIONS.delete(req.cookies.sessionId)` and `res.clearCookie("sessionId", {...})`
before returning 401.

## F
**F1.** Plain text: anyone who reads the DB sees every password. Encrypted:
reversible — if the key leaks, all passwords leak. Hashed: one-way, can't be reversed
(best).

**F2.** The **cost factor** — higher = slower = harder to brute-force. Not the salt and
not the length.

**F3.** No — a new random salt is used each time. `compare` reads the salt and cost
stored inside the hash, re-hashes the input with them and compares.

**F4.** 60 characters, e.g. `$2b$10$...`.

**F5.** `bcrypt.hash`, `genSalt` and `compare` return Promises; without `await` you get
a Promise, not the result.

**F6.** With `###` (blank line between headers and body).

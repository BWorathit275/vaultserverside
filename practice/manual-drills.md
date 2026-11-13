# Manual drills — DevTools, npm, curl, spotting errors

Short hands-on tasks for things the exam might ask you to *do* or *explain*.

---

## 1. DevTools: cookies (10 min) — use exercise 3 or 7

1. Log in. Open **DevTools (F12) → Application → Cookies → http://localhost:...**
   Read: Name, Value, Domain, Path, Expires, **HttpOnly**, **Secure**, **SameSite**.
2. **Console:** type `document.cookie`. Is `sessionId` shown? Why not? (*HttpOnly*)
3. **Delete** the `sessionId` cookie → refresh / call a protected route → **401**.
4. **Edit** the value to random text → still **401** (server can't find the session).
5. **Session hijack demo (the slides' herokuapp steps):** log in at
   `https://the-internet.herokuapp.com/login` (tomsmith / SuperSecretPassword!), copy
   `rack.session`, open an **Incognito** window, go to `/secure`, add the cookie with that value,
   refresh → you are logged in without a password. *Lesson:* the session cookie **is** the login —
   protect it (HttpOnly, Secure, short expiry, logout deletes it).
6. **Network tab:** click a request → *Headers*: find `Set-Cookie` in the response of
   `/login` and `Cookie` in the next request.

## 2. DevTools: Network (5 min) — use exercise 10

1. Submit the "Add product" form → find the **POST** request → *Payload* shows
   `name=...&price=...` (urlencoded). Response status **302** + `Location` header.
2. Right-click a request → **Copy → Copy as cURL** → paste it in a terminal and run it.

---

## 3. npm & package.json (questions)

1. `npm init -y` creates which file?
2. Difference between `npm i express` and `npm i -D jest`? Where does each appear in `package.json`?
3. You cloned a project without `node_modules`. What one command installs everything?
4. Should `node_modules/` be committed to Git? Which file prevents it?
5. `"scripts": { "dev": "node --watch server.js" }` — how do you run it? Why does
   `npm test` work without `run` but `npm dev` doesn't?
6. What is `package-lock.json` for?
7. `^4.21.2` in dependencies — what does `^` allow? (Semantic Versioning)

<details><summary>Answers</summary>

1. `package.json` · 2. `express` → `dependencies` (needed to run); `jest` → `devDependencies`
(only for development/testing) · 3. `npm install` · 4. No — `.gitignore` with `node_modules/`
· 5. `npm run dev`; `test` and `start` are special scripts with shortcuts, others need `run`
· 6. Locks the exact installed versions so everyone gets the same ones
· 7. Any **minor/patch** update within major 4 (≥ 4.21.2 and < 5.0.0) — no breaking (major) changes.
</details>

---

## 4. curl drills (run against exercise 6 or 9)

Write the command, then run it:

1. GET `/api/products` showing the status line and headers
2. GET with header `Accept: application/json`
3. POST JSON `{ "name": "Pen", "price": 20 }`
4. DELETE `/api/products/3`
5. GET with Basic Auth user1 / 12345, two different ways
6. GET `/api/products?min=100&max=500` (why do you need quotes?)

<details><summary>Answers</summary>

```bash
curl -i http://localhost:3000/api/products
curl -H "Accept: application/json" http://localhost:3000/api/products
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d '{"name":"Pen","price":20}'
curl -X DELETE http://localhost:3000/api/products/3
curl -u user1:12345 http://localhost:3000/tasks
curl -H "Authorization: Basic dXNlcjE6MTIzNDU=" http://localhost:3000/tasks
curl "http://localhost:3000/api/products?min=100&max=500"   # & would split the command in the shell
```
On Windows **cmd**, use double quotes for the JSON and escape the inner ones:
`-d "{\"name\":\"Pen\",\"price\":20}"`.
</details>

---

## 5. Spot the error (syntax / run-time / logic) — and fix it

```js
// 1
const items = ["a", "b", "c"];
for (let i = 0; i <= items.length; i++) console.log(items[i].toUpperCase());

// 2
function isEven(n) { return n % 2 === 1; }

// 3
const user = { name: "Ann", age: 20 ;

// 4
app.get("/products/:id", (req, res) => {
  if (req.params.id === 5) return res.json(product5);
  res.sendStatus(404);
});

// 5
const total = "100" + 50;    // expected 150

// 6
router.get("/products/:id", controller.getById);
router.get("/products/count", controller.count);   // always returns 404

// 7
app.post("/users", (req, res) => {
  const hash = bcrypt.hash(req.body.password, 10);
  users.push({ name: req.body.name, password: hash });
  res.sendStatus(201);
});

// 8
<p>Welcome <%- user.name %></p>   <!-- user.name comes from a form -->
```

<details><summary>Answers</summary>

1. **Run-time** — `i <= items.length` reads `items[3]` (undefined) → `.toUpperCase()` throws. Use `<`.
2. **Logic** — even means `n % 2 === 0`.
3. **Syntax** — `;` instead of `}`.
4. **Logic** — `req.params.id` is the **string** `"5"`, so `=== 5` is never true. Use `Number(req.params.id) === 5`.
5. **Logic** — string concatenation gives `"10050"`. Use `Number("100") + 50`.
6. **Logic (route order)** — `/products/:id` matches `count` first. Put `/products/count` above it.
7. **Logic** — `bcrypt.hash` returns a **Promise**; without `async`/`await` a Promise object is stored instead of the hash.
8. **Security (XSS)** — `<%-` doesn't escape user input; use `<%=`.
</details>

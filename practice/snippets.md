# Copy-paste snippets — Jest · Express MVC · EJS · Cookies · bcrypt

Clean versions of the patterns from the slides, ready to paste into VS Code.

---

## 1. Project setup

```bash
npm init -y
npm install express                 # + ejs / cors / cookie-parser / bcrypt / mysql2 dotenv uuid as needed
npm install -D jest                 # test tools are devDependencies
```

```json
"scripts": {
  "test": "jest",
  "start": "node server.js",
  "dev": "node --watch server.js"
}
```

---

## 2. Jest

### Test file template (`something.test.js`)

```js
const fn = require("./something");

describe("fn", () => {
  // Positive
  it("should return X for a valid input", () => {
    // Arrange
    const input = 10;
    // Act
    const result = fn(input);
    // Assert
    expect(result).toBe(100);
  });

  // Boundary (test the edge and both sides: 7 / 8 / 9 for ">= 8")
  it("should accept the minimum value", () => {
    expect(fn(8)).toBe(true);
  });

  // Negative
  it("should reject an invalid input", () => {
    expect(() => fn(-1)).toThrow("must be positive");
  });
});
```

### Exporting more than one function

```js
module.exports = { isPassing, getFailedStudents };          // in grade.js
const { isPassing, getFailedStudents } = require("./grade"); // in grade.test.js
```

### Matchers

```js
expect(value).toBe(5);                    // primitives, null, undefined, true/false, strings
expect(obj).toEqual({ a: 1, b: [2] });    // objects / arrays (deep)
expect(value).toBeTruthy();               // not false, 0, "", null, undefined, NaN
expect(value).toBeFalsy();
expect(array).toContain("admin");         // item in array, or substring in string
expect(value).not.toBe(0);                // negate any matcher
expect(() => divide(10, 0)).toThrow();                         // any error
expect(() => divide(10, 0)).toThrow("Cannot divide by zero");  // message contains
expect(() => setScore(150)).toThrow(RangeError);               // error type
```

### Async (Promises, bcrypt, DB)

```js
test("hash matches password", async () => {
  const hash = await bcrypt.hash("pw", 10);
  expect(await bcrypt.compare("pw", hash)).toBe(true);
});
await expect(promise).resolves.toBe(true);
await expect(promise).rejects.toThrow("Not found");
```

### Useful CLI / hooks

```bash
npx jest --watch      # rerun tests related to changed files
npx jest --coverage   # coverage report
npm test -- --verbose # pass flags through npm
```

```js
beforeEach(() => { /* reset data before every test */ });
afterAll(() => { /* close connections */ });
```

---

## 3. Express MVC

### `index.js`

```js
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const webRoutes = require("./routes/webRoutes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());              // without this, req.body is undefined
app.use(express.static("public"));    // public/css/style.css -> /css/style.css

app.use("/api", productRoutes);        // all API routes get the /api prefix
app.use("/", webRoutes);

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
```

### `configs/db.js` (MySQL, as in the lab)

```js
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = db;
```

### `routes/productRoutes.js`

```js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/products", productController.getAllProducts);
router.get("/products/search/:keyword", productController.searchProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.put("/products/restore/:id", productController.restoreProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.softDeleteProduct);

module.exports = router;
```

### `models/productModel.js`

```js
const db = require("../configs/db");   // must match the real folder name
const { v4: uuidv4 } = require("uuid");

const Product = {
  getAll: (callback) => {
    db.query("SELECT * FROM products WHERE is_deleted = 0", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM products WHERE id = ? AND is_deleted = 0", [id], callback);
  },
  searchByKeyword: (keyword, callback) => {
    db.query("SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0", [`%${keyword}%`], callback);
  },
  create: (data, callback) => {
    const { name, price, discount, review_count, image_url } = data;
    const query = "INSERT INTO products (id, name, price, discount, review_count, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [uuidv4(), name, price, discount, review_count, image_url], callback);
  },
  update: (id, data, callback) => {
    const { name, price, discount, review_count, image_url } = data;
    const query = "UPDATE products SET name = ?, price = ?, discount = ?, review_count = ?, image_url = ? WHERE id = ?";
    db.query(query, [name, price, discount, review_count, image_url, id], callback);
  },
  softDelete: (id, callback) => {
    db.query("UPDATE products SET is_deleted = 1 WHERE id = ?", [id], callback);
  },
  restore: (id, callback) => {
    db.query("UPDATE products SET is_deleted = 0 WHERE id = ?", [id], callback);
  },
};

module.exports = Product;
```

### `controllers/productController.js`

```js
const Product = require("../models/productModel");

const productController = {
  getAllProducts: (req, res) => {
    Product.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },
  getProductById: (req, res) => {
    Product.getById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results[0] || {});
    });
  },
  createProduct: (req, res) => {
    const { name, price } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ error: "name and price are required" });
    }
    Product.create(req.body, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Product created" });
    });
  },
  // View (EJS)
  getProductsView: (req, res) => {
    Product.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.render("products", { products: results });
    });
  },
};

module.exports = productController;
```

### `routes/webRoutes.js`

```js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProductsView);

module.exports = router;
```

### req.params vs req.query vs req.body

```js
// GET /products/5            route "/products/:id"  -> req.params.id      === "5"
// GET /tasks?status=Done                            -> req.query.status   === "Done"
// POST /users  {"name":"A"}                         -> req.body.name      === "A"  (needs express.json())
```

---

## 4. EJS (`views/products.ejs`)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <%- include('partials/header') %>
  <h1>Product List</h1>
  <% if (products.length === 0) { %>
    <p>No products</p>
  <% } else { %>
    <div class="grid">
      <% products.forEach((product) => { %>
        <div class="card">
          <img src="<%= product.image_url %>" alt="<%= product.name %>">
          <h3><%= product.name %></h3>
          <p><%= product.price %> บาท</p>
        </div>
      <% }) %>
    </div>
  <% } %>
</body>
</html>
```

`<%= %>` escaped output (safe) · `<%- %>` raw HTML · `<% %>` JS, no output.

---

## 5. Cookies & sessions

```js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));
app.use(cookieParser());

const SESSIONS = new Map();
const COOKIE_OPTIONS = { secure: true, httpOnly: true, sameSite: "none" };

app.post("/login", (req, res) => {
  const user = USERS.get(req.body.username);
  if (user == null) {
    SESSIONS.delete(req.cookies.sessionId);
    res.clearCookie("sessionId", COOKIE_OPTIONS);
    return res.sendStatus(401);
  }
  const sessionId = crypto.randomUUID();
  SESSIONS.set(sessionId, user);
  res.cookie("sessionId", sessionId, COOKIE_OPTIONS).send(`Authed as ${user.username}`);
});

app.get("/adminData", (req, res) => {
  const user = SESSIONS.get(req.cookies.sessionId);
  if (user == null) return res.sendStatus(401);          // not logged in
  if (user.role !== "Admin") return res.sendStatus(403); // no permission
  res.send("Authorized: You are viewing restricted administrator controls.");
});

app.post("/logout", (req, res) => {
  SESSIONS.delete(req.cookies.sessionId);
  res.clearCookie("sessionId", COOKIE_OPTIONS);
  res.send("Logged out");
});
```

Client (different origin → cookies only sent with `credentials: "include"`):

```js
fetch("http://localhost:3000/adminData", {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.text())
  .then((data) => (responsesDiv.textContent = data));
```

---

## 6. bcrypt

```js
const bcrypt = require("bcrypt");

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    users.push({ name: req.body.name, password: hashedPassword });
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((u) => u.name === req.body.name);
  if (user == null) return res.status(400).send("Cannot find user");
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});
```

---

## 7. REST Client (`request.rest`)

```http
@base = http://localhost:3000

### Get all users
GET {{base}}/users

### Create a new user
POST {{base}}/users
Content-Type: application/json

{ "name": "Elon Musk", "password": "syntaxerror" }
```

Requests are separated by `###`; keep a blank line between headers and body.

---

## 8. Postman test script (Scripts → Post-response)

```js
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});
pm.test("Has id", () => {
  pm.expect(pm.response.json()).to.have.property("id");
});
```

## 9. curl

```bash
curl -i http://localhost:3000/api/products
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d "{\"name\":\"A\",\"price\":10}"
curl -u user1:12345 <url>        # Basic Auth
```

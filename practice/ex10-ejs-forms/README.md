# Exercise 10 — EJS partials, detail page & HTML forms (40 min)

Server-rendered pages (the **View** in MVC) with forms instead of JSON.
`models/productModel.js` is given (in-memory, callback style). Build the rest in `starter/`.

## Pages

| Method | URL | What it does |
|---|---|---|
| GET | `/` | redirect to `/products` |
| GET | `/products?q=` | list + **search form** (`method="GET"` → query string `?q=`) |
| GET | `/products/new` | empty "Add product" form |
| POST | `/products` | form submit; invalid → re-show the form with **error messages and the typed values** (400); valid → `res.redirect('/products/<id>')` |
| GET | `/products/:id` | detail page; missing → **404 page** |
| POST | `/products/:id/delete` | soft delete via a form button → redirect to `/products` |
| anything else | | 404 page |

Validation: name required (trimmed); price must be a number > 0.

## Requirements

1. **Partials:** `views/partials/header.ejs` (doctype, `<title><%= title %> | Shop</title>`, CSS link,
   nav links) and `footer.ejs`. Every page starts with `<%- include('partials/header', { title }) %>`
   and ends with `<%- include('partials/footer') %>`.
2. **Form bodies:** HTML forms send `application/x-www-form-urlencoded`, so add
   `app.use(express.urlencoded({ extended: true }))` — without it `req.body` is empty.
3. **Form fields are strings** — convert `price` with `Number()`.
4. **HTML forms only support GET and POST**, which is why delete is `POST /products/:id/delete`.
5. **Post/Redirect/Get:** after a successful POST, `res.redirect(...)` so refreshing doesn't resubmit.
6. **Route order:** `/products/new` before `/products/:id`.
7. **Escape everything** with `<%= %>` — try adding a product named `<script>alert(1)</script>`:
   the page must show the text, not run it.
8. Show "No products found" when the list/search is empty, and "No description" when it's blank.

## Check
- Submit the form empty → both errors shown, status 400.
- Submit `price = -5` → price error, the name you typed is still in the box.
- View source of any page: header and footer appear once.

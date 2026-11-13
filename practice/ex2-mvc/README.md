# Exercise 2 — Refactor to MVC + EJS view (40 min)

`starter/index.js` is a working **Books API** with everything in one file
(routes, logic and data together), like the lab project before refactoring.

## Part A — Split into MVC (keep every endpoint working)

Target structure:

```
configs/db.js                 // data source (given in the solution; in the lab: mysql2 + dotenv)
models/bookModel.js           // all data access, callback(err, results)
controllers/bookController.js // req/res + validation + status codes
routes/bookRoutes.js          // express.Router(), URL -> controller function
index.js                      // app setup, app.use('/api', bookRoutes), listen
```

Rules (same as the lab):
- `app.get` → `router.get` in the routes file, and `module.exports = router`
- Routes contain **no logic**: `router.get('/books', bookController.getAllBooks)`
- Controllers never touch the data array directly — they call the Model
- Keep soft delete (`is_deleted`) and restore

Endpoints that must still work (test with `request.rest`):

| Method | URL | Result |
|---|---|---|
| GET | /api/books | all books not deleted |
| GET | /api/books/:id | one book, 404 if missing |
| GET | /api/books/search/:keyword | title contains keyword |
| POST | /api/books | 201; 400 if `title` or `price` missing |
| PUT | /api/books/:id | update |
| DELETE | /api/books/:id | soft delete |
| PUT | /api/books/restore/:id | restore |

## Part B — EJS view

1. `npm install ejs`, set `app.set('view engine', 'ejs')`
2. Create `views/books.ejs` showing each book (title, author, price) using `forEach` and `<%= %>`
3. Add `routes/webRoutes.js` with `router.get('/', bookController.getBooksView)` and
   mount it with `app.use('/', webRoutes)`
4. Move the inline CSS into `public/css/style.css`, add
   `app.use(express.static('public'))` and a `<link rel="stylesheet" href="/css/style.css">`

Open http://localhost:3000/ to see the page.

const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;
app.use(express.json());

// "Database" (in the lab this is MySQL)
const books = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", price: 890, is_deleted: 0 },
  { id: "2", title: "The Pragmatic Programmer", author: "Hunt & Thomas", price: 950, is_deleted: 0 },
  { id: "3", title: "JavaScript: The Good Parts", author: "Douglas Crockford", price: 420, is_deleted: 0 },
];

// Web page
app.get("/", (req, res) => {
  const items = books
    .filter((b) => b.is_deleted === 0)
    .map((b) => `<div class="card"><h3>${b.title}</h3><p>${b.author}</p><p>${b.price} บาท</p></div>`)
    .join("");
  res.send(`<html><head><style>
    body { font-family: sans-serif; } .grid { display: flex; gap: 12px; }
    .card { border: 1px solid #ccc; padding: 12px; border-radius: 8px; }
  </style></head><body><h1>Book List</h1><div class="grid">${items}</div></body></html>`);
});

// Get all books
app.get("/api/books", (req, res) => {
  res.json(books.filter((b) => b.is_deleted === 0));
});

// Get book by ID
app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id && b.is_deleted === 0);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// Search by keyword
app.get("/api/books/search/:keyword", (req, res) => {
  const keyword = req.params.keyword.toLowerCase();
  res.json(books.filter((b) => b.is_deleted === 0 && b.title.toLowerCase().includes(keyword)));
});

// Create
app.post("/api/books", (req, res) => {
  const { title, author, price } = req.body;
  if (!title || price == null) {
    return res.status(400).json({ error: "title and price are required" });
  }
  const book = { id: crypto.randomUUID(), title, author, price, is_deleted: 0 };
  books.push(book);
  res.status(201).json({ id: book.id, message: "Book created" });
});

// Update
app.put("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  const { title, author, price } = req.body;
  Object.assign(book, { title, author, price });
  res.json({ message: "Book updated" });
});

// Soft delete
app.delete("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  book.is_deleted = 1;
  res.json({ message: "Book soft-deleted" });
});

// Restore
app.put("/api/books/restore/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  book.is_deleted = 0;
  res.json({ message: "Book restored" });
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));

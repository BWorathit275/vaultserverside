const express = require("express");

// The app is created here WITHOUT app.listen(), so tests can import it.
function createApp() {
  const app = express();
  app.use(express.json());

  let nextId = 3;
  const books = [
    { id: 1, title: "Clean Code", price: 890 },
    { id: 2, title: "Refactoring", price: 1200 },
  ];

  app.get("/api/books", (req, res) => {
    res.json(books);
  });

  app.get("/api/books/:id", (req, res) => {
    const book = books.find((b) => b.id === Number(req.params.id));
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  });

  app.post("/api/books", (req, res) => {
    const { title, price } = req.body;
    if (typeof title !== "string" || title.trim() === "" || typeof price !== "number" || price <= 0) {
      return res.status(400).json({ error: "title (string) and price (> 0) are required" });
    }
    const book = { id: nextId++, title: title.trim(), price };
    books.push(book);
    res.status(201).json(book);
  });

  app.delete("/api/books/:id", (req, res) => {
    const index = books.findIndex((b) => b.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Book not found" });
    books.splice(index, 1);
    res.json({ message: "Book deleted" });
  });

  return app;
}

module.exports = createApp;

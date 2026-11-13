const Book = require("../models/bookModel");
const { SESSIONS } = require("../configs/data");
const { validateBook } = require("../utils/validators");

const bookController = {
  // GET list of books that are not deleted.
  getAllBooks: (req, res) => {
    Book.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  // POST a new book; 400 if the data is invalid, 201 when created.
  createBook: (req, res) => {
    try {
      validateBook(req.body);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    Book.create(req.body, (err, book) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(book);
    });
  },

  // DELETE (soft) a book; 404 if missing.
  deleteBook: (req, res) => {
    Book.softDelete(Number(req.params.id), (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Book not found" });
      res.json({ message: "Book soft-deleted" });
    });
  },

  // POST borrow a book: 404 if missing, 409 if no copies left, else copies - 1.
  borrowBook: (req, res) => {
    Book.borrow(Number(req.params.id), (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!result.found) return res.status(404).json({ error: "Book not found" });
      if (!result.available) return res.status(409).json({ error: "No copies left" });
      res.json({ message: `Borrowed "${result.book.title}"`, copiesLeft: result.book.copies });
    });
  },

  // EJS page: works logged in or not
  getBooksView: (req, res) => {
    const user = SESSIONS.get(req.cookies.sessionId) || null;
    Book.getAll((err, results) => {
      if (err) return res.status(500).send(err.message);
      res.render("books", { books: results, user });
    });
  },
};

module.exports = bookController;

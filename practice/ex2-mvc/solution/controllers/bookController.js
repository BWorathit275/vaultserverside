const Book = require("../models/bookModel");

// Send the standard 404 JSON for a missing book.
const notFound = (res) => res.status(404).json({ error: "Book not found" });

const bookController = {
  // GET list of books that are not deleted.
  getAllBooks: (req, res) => {
    Book.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  // GET one book by id; 404 if missing.
  getBookById: (req, res) => {
    Book.getById(req.params.id, (err, book) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!book) return notFound(res);
      res.json(book);
    });
  },

  // GET books whose title contains :keyword.
  searchBooks: (req, res) => {
    const { keyword } = req.params;
    Book.searchByKeyword(keyword, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  // POST a new book; 400 if the data is invalid, 201 when created.
  createBook: (req, res) => {
    const { title, price } = req.body;
    if (!title || price == null) {
      return res.status(400).json({ error: "title and price are required" });
    }
    Book.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, message: "Book created" });
    });
  },

  // PUT update a book; 404 if missing.
  updateBook: (req, res) => {
    Book.update(req.params.id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return notFound(res);
      res.json({ message: "Book updated" });
    });
  },

  // DELETE (soft) a book; 404 if missing.
  softDeleteBook: (req, res) => {
    Book.softDelete(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return notFound(res);
      res.json({ message: "Book soft-deleted" });
    });
  },

  // PUT restore a soft-deleted book; 404 if missing.
  restoreBook: (req, res) => {
    Book.restore(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return notFound(res);
      res.json({ message: "Book restored" });
    });
  },

  // Part B: render the EJS view
  getBooksView: (req, res) => {
    Book.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.render("books", { books: results });
    });
  },
};

module.exports = bookController;

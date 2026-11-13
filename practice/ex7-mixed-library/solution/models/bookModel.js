const { books } = require("../configs/data");

// callback(err, results) like db.query in the lab
const Book = {
  // Get all books that are not soft-deleted.
  getAll: (callback) => {
    callback(null, books.filter((b) => b.is_deleted === 0));
  },

  // Find one book by id (undefined if missing or deleted).
  getById: (id, callback) => {
    callback(null, books.find((b) => b.id === id && b.is_deleted === 0));
  },

  // Add a new book (title trimmed) and return it.
  create: ({ title, author, copies }, callback) => {
    const book = { id: books.length + 1, title: title.trim(), author, copies, is_deleted: 0 };
    books.push(book);
    callback(null, book);
  },

  // Mark a book as deleted (is_deleted = 1); affectedRows 0 if not found.
  softDelete: (id, callback) => {
    const book = books.find((b) => b.id === id && b.is_deleted === 0);
    if (!book) return callback(null, { affectedRows: 0 });
    book.is_deleted = 1;
    callback(null, { affectedRows: 1 });
  },

  // Take one copy of a book: reports not found / no copies left / success.
  borrow: (id, callback) => {
    const book = books.find((b) => b.id === id && b.is_deleted === 0);
    if (!book) return callback(null, { found: false });
    if (book.copies === 0) return callback(null, { found: true, available: false });
    book.copies -= 1;
    callback(null, { found: true, available: true, book });
  },
};

module.exports = Book;

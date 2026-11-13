const crypto = require("crypto");
const books = require("../configs/db");

// Every method uses callback(err, results), like db.query in the lab.
const Book = {
  // Get all books that are not soft-deleted.
  getAll: (callback) => {
    callback(null, books.filter((b) => b.is_deleted === 0));
  },

  // Find one book by id (undefined if missing or deleted).
  getById: (id, callback) => {
    callback(null, books.find((b) => b.id === id && b.is_deleted === 0));
  },

  // Find books whose title contains the keyword (case-insensitive).
  searchByKeyword: (keyword, callback) => {
    const term = keyword.toLowerCase();
    callback(null, books.filter((b) => b.is_deleted === 0 && b.title.toLowerCase().includes(term)));
  },

  // Add a new book with a random UUID and return its id as insertId.
  create: (bookData, callback) => {
    const { title, author, price } = bookData;
    const book = { id: crypto.randomUUID(), title, author, price, is_deleted: 0 };
    books.push(book);
    callback(null, { insertId: book.id });
  },

  // Replace a book's title, author and price; affectedRows 0 if not found.
  update: (id, bookData, callback) => {
    const book = books.find((b) => b.id === id);
    if (!book) return callback(null, { affectedRows: 0 });
    const { title, author, price } = bookData;
    Object.assign(book, { title, author, price });
    callback(null, { affectedRows: 1 });
  },

  // Mark a book as deleted (is_deleted = 1); affectedRows 0 if not found.
  softDelete: (id, callback) => {
    const book = books.find((b) => b.id === id);
    if (!book) return callback(null, { affectedRows: 0 });
    book.is_deleted = 1;
    callback(null, { affectedRows: 1 });
  },

  // Undo a soft delete (is_deleted = 0); affectedRows 0 if not found.
  restore: (id, callback) => {
    const book = books.find((b) => b.id === id);
    if (!book) return callback(null, { affectedRows: 0 });
    book.is_deleted = 0;
    callback(null, { affectedRows: 1 });
  },
};

module.exports = Book;

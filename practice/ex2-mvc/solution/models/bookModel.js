const crypto = require("crypto");
const books = require("../configs/db");

// Every method uses callback(err, results), like db.query in the lab.
const Book = {
  getAll: (callback) => {
    callback(null, books.filter((b) => b.is_deleted === 0));
  },

  getById: (id, callback) => {
    callback(null, books.find((b) => b.id === id && b.is_deleted === 0));
  },

  searchByKeyword: (keyword, callback) => {
    const term = keyword.toLowerCase();
    callback(null, books.filter((b) => b.is_deleted === 0 && b.title.toLowerCase().includes(term)));
  },

  create: (bookData, callback) => {
    const { title, author, price } = bookData;
    const book = { id: crypto.randomUUID(), title, author, price, is_deleted: 0 };
    books.push(book);
    callback(null, { insertId: book.id });
  },

  update: (id, bookData, callback) => {
    const book = books.find((b) => b.id === id);
    if (!book) return callback(null, { affectedRows: 0 });
    const { title, author, price } = bookData;
    Object.assign(book, { title, author, price });
    callback(null, { affectedRows: 1 });
  },

  softDelete: (id, callback) => {
    const book = books.find((b) => b.id === id);
    if (!book) return callback(null, { affectedRows: 0 });
    book.is_deleted = 1;
    callback(null, { affectedRows: 1 });
  },

  restore: (id, callback) => {
    const book = books.find((b) => b.id === id);
    if (!book) return callback(null, { affectedRows: 0 });
    book.is_deleted = 0;
    callback(null, { affectedRows: 1 });
  },
};

module.exports = Book;

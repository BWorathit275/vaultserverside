const { books } = require("../configs/data");

// callback(err, results) like db.query in the lab
const Book = {
  getAll: (callback) => {
    callback(null, books.filter((b) => b.is_deleted === 0));
  },

  getById: (id, callback) => {
    callback(null, books.find((b) => b.id === id && b.is_deleted === 0));
  },

  create: ({ title, author, copies }, callback) => {
    const book = { id: books.length + 1, title: title.trim(), author, copies, is_deleted: 0 };
    books.push(book);
    callback(null, book);
  },

  softDelete: (id, callback) => {
    const book = books.find((b) => b.id === id && b.is_deleted === 0);
    if (!book) return callback(null, { affectedRows: 0 });
    book.is_deleted = 1;
    callback(null, { affectedRows: 1 });
  },

  borrow: (id, callback) => {
    const book = books.find((b) => b.id === id && b.is_deleted === 0);
    if (!book) return callback(null, { found: false });
    if (book.copies === 0) return callback(null, { found: true, available: false });
    book.copies -= 1;
    callback(null, { found: true, available: true, book });
  },
};

module.exports = Book;

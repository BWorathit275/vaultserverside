const db = require("../configs/db");

const Product = {
  getAll: (callback) => {
    db.query("SELECT * FROM products WHERE is_deleted = 0", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM products WHERE id = ? AND is_deleted = 0", [id], callback);
  },

  searchByKeyword: (keyword, callback) => {
    db.query("SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0", [`%${keyword}%`], callback);
  },

  create: (data, callback) => {
    const { name, price, discount, review_count, category_id } = data;
    const query = "INSERT INTO products (name, price, discount, review_count, category_id) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, price, discount ?? null, review_count ?? 0, category_id ?? null], callback);
  },

  softDelete: (id, callback) => {
    db.query("UPDATE products SET is_deleted = 1 WHERE id = ?", [id], callback);
  },

  restore: (id, callback) => {
    db.query("UPDATE products SET is_deleted = 0 WHERE id = ?", [id], callback);
  },
};

module.exports = Product;

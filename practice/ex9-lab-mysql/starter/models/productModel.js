const db = require("../configs/db");

const Product = {
  // SELECT all products that are not soft-deleted.
  getAll: (callback) => {
    db.query("SELECT * FROM products WHERE is_deleted = 0", callback);
  },

  // SELECT one product by id if it isn't deleted.
  getById: (id, callback) => {
    db.query("SELECT * FROM products WHERE id = ? AND is_deleted = 0", [id], callback);
  },

  // SELECT products whose name matches LIKE %keyword%.
  searchByKeyword: (keyword, callback) => {
    db.query("SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0", [`%${keyword}%`], callback);
  },

  // INSERT a new product (optional fields default to NULL / 0).
  create: (data, callback) => {
    const { name, price, discount, review_count, category_id } = data;
    const query = "INSERT INTO products (name, price, discount, review_count, category_id) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, price, discount ?? null, review_count ?? 0, category_id ?? null], callback);
  },

  // UPDATE is_deleted = 1 (soft delete).
  softDelete: (id, callback) => {
    db.query("UPDATE products SET is_deleted = 1 WHERE id = ?", [id], callback);
  },

  // UPDATE is_deleted = 0 (undo soft delete).
  restore: (id, callback) => {
    db.query("UPDATE products SET is_deleted = 0 WHERE id = ?", [id], callback);
  },
};

module.exports = Product;

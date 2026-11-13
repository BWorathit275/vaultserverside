const db = require("../configs/db");

// T5: new table -> new model
const Category = {
  getAll: (callback) => {
    db.query("SELECT * FROM categories ORDER BY name", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM categories WHERE id = ?", [id], callback);
  },

  getProducts: (categoryId, callback) => {
    const query =
      "SELECT p.id, p.name, p.price, c.name AS category " +
      "FROM products p JOIN categories c ON p.category_id = c.id " +
      "WHERE c.id = ? AND p.is_deleted = 0 ORDER BY p.id";
    db.query(query, [categoryId], callback);
  },
};

module.exports = Category;

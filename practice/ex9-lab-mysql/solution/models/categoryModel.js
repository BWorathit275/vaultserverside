const db = require("../configs/db");

// T5: new table -> new model
const Category = {
  // SELECT all categories ordered by name.
  getAll: (callback) => {
    db.query("SELECT * FROM categories ORDER BY name", callback);
  },

  // SELECT one category by id (empty array if it doesn't exist).
  getById: (id, callback) => {
    db.query("SELECT * FROM categories WHERE id = ?", [id], callback);
  },

  // SELECT the products of one category using a JOIN.
  getProducts: (categoryId, callback) => {
    const query =
      "SELECT p.id, p.name, p.price, c.name AS category " +
      "FROM products p JOIN categories c ON p.category_id = c.id " +
      "WHERE c.id = ? AND p.is_deleted = 0 ORDER BY p.id";
    db.query(query, [categoryId], callback);
  },
};

module.exports = Category;

const db = require("../configs/db");

// Column names can't be "?" placeholders, so ORDER BY uses a whitelist (prevents SQL injection).
const SORTS = {
  price_asc: "price ASC",
  price_desc: "price DESC",
  name: "name ASC",
};

const Product = {
  // T1-T3: filter by price, sort and paginate in one query
  getAll: ({ min, max, sort, limit, offset }, callback) => {
    const conditions = ["is_deleted = 0"];
    const params = [];
    if (min !== undefined) {
      conditions.push("price >= ?");
      params.push(min);
    }
    if (max !== undefined) {
      conditions.push("price <= ?");
      params.push(max);
    }
    const orderBy = SORTS[sort] || "id ASC";
    const query = `SELECT * FROM products WHERE ${conditions.join(" AND ")} ORDER BY ${orderBy} LIMIT ? OFFSET ?`;
    db.query(query, [...params, limit, offset], callback);
  },

  // T4
  count: (callback) => {
    db.query("SELECT COUNT(*) AS total FROM products WHERE is_deleted = 0", callback);
  },

  // T6
  stats: (callback) => {
    const query =
      "SELECT COUNT(*) AS total, ROUND(AVG(price), 2) AS avg_price, MIN(price) AS min_price, MAX(price) AS max_price " +
      "FROM products WHERE is_deleted = 0";
    db.query(query, callback);
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

Product.SORTS = SORTS;

module.exports = Product;

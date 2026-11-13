const Product = require("../models/productModel");

// Returns a number, undefined (not given) or NaN (invalid). Query values are always strings.
const toNumber = (value) => (value === undefined ? undefined : Number(value));

const productController = {
  // GET /api/products?min=&max=&sort=&page=&limit=
  getAllProducts: (req, res) => {
    const min = toNumber(req.query.min);
    const max = toNumber(req.query.max);
    const page = toNumber(req.query.page) ?? 1;
    const limit = toNumber(req.query.limit) ?? 10;
    const { sort } = req.query;

    if (Number.isNaN(min) || Number.isNaN(max) || min < 0 || max < 0) {
      return res.status(400).json({ error: "min and max must be numbers >= 0" });
    }
    if (min !== undefined && max !== undefined && min > max) {
      return res.status(400).json({ error: "min cannot be greater than max" });
    }
    if (sort !== undefined && !Product.SORTS[sort]) {
      return res.status(400).json({ error: `sort must be one of ${Object.keys(Product.SORTS).join(", ")}` });
    }
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 20) {
      return res.status(400).json({ error: "page must be >= 1 and limit 1-20" });
    }

    Product.getAll({ min, max, sort, limit, offset: (page - 1) * limit }, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  countProducts: (req, res) => {
    Product.count((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ total: results[0].total });
    });
  },

  getStats: (req, res) => {
    Product.stats((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results[0]);
    });
  },

  getProductById: (req, res) => {
    Product.getById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "Product not found" });
      res.json(results[0]);
    });
  },

  searchProducts: (req, res) => {
    Product.searchByKeyword(req.params.keyword, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  createProduct: (req, res) => {
    const { name, price } = req.body;
    if (!name || price == null) return res.status(400).json({ error: "name and price are required" });
    Product.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, message: "Product created" });
    });
  },

  softDeleteProduct: (req, res) => {
    Product.softDelete(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
      res.json({ message: "Product soft-deleted" });
    });
  },

  restoreProduct: (req, res) => {
    Product.restore(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
      res.json({ message: "Product restored" });
    });
  },
};

module.exports = productController;

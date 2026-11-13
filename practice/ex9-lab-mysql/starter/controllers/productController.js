const Product = require("../models/productModel");

const productController = {
  getAllProducts: (req, res) => {
    Product.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
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

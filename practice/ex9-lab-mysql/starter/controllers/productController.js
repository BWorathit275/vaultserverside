const Product = require("../models/productModel");

const productController = {
  // GET all products that are not deleted.
  getAllProducts: (req, res) => {
    Product.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  // GET one product by id; 404 if missing.
  getProductById: (req, res) => {
    Product.getById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "Product not found" });
      res.json(results[0]);
    });
  },

  // GET products whose name contains :keyword.
  searchProducts: (req, res) => {
    Product.searchByKeyword(req.params.keyword, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  // POST a new product; 400 if name or price is missing, 201 when created.
  createProduct: (req, res) => {
    const { name, price } = req.body;
    if (!name || price == null) return res.status(400).json({ error: "name and price are required" });
    Product.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, message: "Product created" });
    });
  },

  // DELETE (soft) a product; 404 if missing.
  softDeleteProduct: (req, res) => {
    Product.softDelete(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
      res.json({ message: "Product soft-deleted" });
    });
  },

  // PUT restore a soft-deleted product; 404 if missing.
  restoreProduct: (req, res) => {
    Product.restore(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
      res.json({ message: "Product restored" });
    });
  },
};

module.exports = productController;

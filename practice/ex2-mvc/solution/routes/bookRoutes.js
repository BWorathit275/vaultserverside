const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/books", bookController.getAllBooks);
router.get("/books/search/:keyword", bookController.searchBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", bookController.createBook);
router.put("/books/restore/:id", bookController.restoreBook);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.softDeleteBook);

module.exports = router;

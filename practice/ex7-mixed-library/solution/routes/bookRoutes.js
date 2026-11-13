const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { requireLogin, requireRole } = require("../middlewares/auth");

router.get("/books", bookController.getAllBooks); // public
router.post("/books", requireLogin, requireRole("librarian"), bookController.createBook);
router.delete("/books/:id", requireLogin, requireRole("librarian"), bookController.deleteBook);
router.post("/books/:id/borrow", requireLogin, requireRole("member"), bookController.borrowBook);

module.exports = router;

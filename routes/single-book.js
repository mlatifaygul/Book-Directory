const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/:id", (req, res) => {
  Book.findById(req.params.id).then((book) => {
    res.render("site/single-book", { book: book });
  });
  console.log(req.params.id);
});

module.exports = router;
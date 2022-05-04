const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Category = require("../models/Category");

router.get("/:id", (req, res) => {
  Book.findById(req.params.id).populate({path: "category", model: Category}).then((book) => {
    Category.find({}).then((categories) => {
      res.render("site/single-book", { book: book, categories: categories });
    });
  });
  console.log(req.params.id);
});

module.exports = router;

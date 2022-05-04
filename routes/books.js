const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", (req, res) => {
  Book.find({})
    .then((books) => {
      Book.find({}).sort({ $natural: -1}).then((book) => {
        res.render("site/books", { books: books, book: book });
      })

    });
});


module.exports = router;

const express = require("express");
const app = express();
const router = express.Router();
const Book = require("../models/Book");

router.get("/", (req, res) => {
  Book.find({}).then((books) => {
    res.render("site/books", { books: books });
  });
});

module.exports = router;

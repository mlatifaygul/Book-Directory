const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// router.get("/", (req, res) => {
//   res.render("site/index");
// });
router.get("/", (req, res) => {
  Book.find({}).then((books) => {
    res.render("site/index", { books: books });
  });
});

module.exports = router;

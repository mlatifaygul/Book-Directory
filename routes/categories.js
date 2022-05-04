const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Category = require("../models/Category");


router.get("/categories", (req, res) => {
  Book.find({}).sort({ $natural: -1 }).then((books) => { 
      Category.find({}).sort({ $natural: -1 })
        .then((categories) => {
          res.render("site/categories", {books: books, categories: categories,
          });
        });
    });
});



module.exports = router;

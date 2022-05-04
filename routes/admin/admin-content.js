const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");
const Category = require("../../models/Category");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { extname } = require("path");

router.get("/books", (req, res) => {
  Book.find({})
    .sort({ $natural: -1 })
    .then((book) => {
      res.render("admin/admin-books", { book: book });
    });
});

router.get("/categories", (req, res) => {
  Category.find({}) 
    .sort({ $natural: -1 })
    .then((category) => {
      res.render("admin/admin-categories", { category: category });
    });
});
router.get("/books/editBook/:id", (req, res) => {
  Book.findOne({ _id: req.params.id }).then((books) => {
    Category.find({}).then((categories) => {
      res.render("admin/editBook", {books: books, categories: categories });
    });
  });
});

router.post("/categories", (req, res) => {
  let cat_image = req.files.cat_image;
  let uuid = uuidv4(cat_image.name);
  let extN = path.extname(req.files.cat_image.name);
  cat_image.mv(
    path.resolve(__dirname, "../../public/img/categoriesImg", uuid + extN)
  );

  Category.create({
    ...req.body,
    cat_image: `/img/categoriesImg/${uuid}${extN}`,
  });
  console.log(req.files.cat_image.name, "-", uuid);

  res.redirect("/admin/categories");
});

// DELETE Category
router.delete("/categories/:id", (req, res) => {
  Category.findByIdAndRemove({ _id: req.params.id }).then(() => {
    res.redirect("/admin/categories");
  });
});
router.delete("/books/:id", (req, res) => {
  Book.findByIdAndRemove({ _id: req.params.id }).then(() => {
    res.redirect("/admin/books");
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");
const Category = require("../../models/Category");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { extname } = require("path");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/addBook", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/users/login");
  }
  Category.find({}).then((categories) => {
    res.render("admin/addBook", { categories: categories });
  });
});

router.post("/addBook", (req, res) => {
  let book_image = req.files.book_image;
  let uuid = uuidv4(book_image.name);
  let extN = path.extname(req.files.book_image.name);
  book_image.mv(
    path.resolve(__dirname, "../../public/img/bookimages", uuid + extN)
  );

  Book.create({
    ...req.body,
    book_image: `/img/bookimages/${uuid}${extN}`,
  });
  console.log(req.files.book_image.name, "-", uuid);

  req.session.sessionFlash = {
    type: "alet alert-success",
    message: "Kitap Başarıyla Eklendi.",
  };

  res.redirect("/books");
});

router.put("/books/:id", (req, res) => {
  let book_image = req.files.book_image;
  let uuid = uuidv4(book_image.name);
  let extN = path.extname(req.files.book_image.name);
  book_image.mv(
    path.resolve(__dirname, "../../public/img/bookimages", uuid + extN)
  );

  Book.findOne({ _id: req.params.id }).then((books) => {
    books.title = req.body.title;
    books.author = req.body.author;
    books.publish = req.body.publish;
    books.category = req.body.category;
    books.book_image = `/img/bookimages/${uuid}${extN}`;
    books.date = req.body.date;
    books.save().then((books) => {
      res.redirect("/admin/books");
    });
  });
});

router.put("/categories/:id", (req, res) => {
  // let cat_image = req.files.cat_image;
  // let uuid = uuidv4(cat_image.name);
  // let extN = path.extname(req.files.cat_image.name);
  // book_image.mv(
  //   path.resolve(__dirname, "../../public/img/bookimages", uuid + extN)
  // );

  Category.findOne({ _id: req.params.id }).then((categories) => {
    categories.catName = req.body.catName;
    // categories.cat_image = `/img/categoriesImg/${uuid}${extN}`;
    categories.save().then((categories) => {
      res.redirect("/admin/categories");
    });
  });
});

module.exports = router;

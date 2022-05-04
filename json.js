const Ajv = require("ajv");
const ajv = new Ajv();
const Book = require("./models/Book");
const Category = require("./models/Category");
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb+srv://arin:toor@nodedemo.b8xph.mongodb.net/bookDir?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/books", (req, res, next) => {
  Book.find({})
    .populate({ path: "category", model: Category })
    .then((data) => {
      let veri = JSON.stringify(data);
      let parse = JSON.parse(veri);
      res.send(parse);
    });
});
app.get("/api/books/:id", (req, res) => {
  Book.findById(req.params.id).then((data) => {
    let veri = JSON.stringify(data);
    let parse = JSON.parse(veri);
    res.send(parse);
  });
});
app.put("/api/books/:id", (req, res) => {
  Book.findOne({ _id: req.params.id }).then((data) => {
    let veri = JSON.stringify(data);
    let parse = JSON.parse(veri);
    res.send(parse);
  });
});

app.listen(8000);

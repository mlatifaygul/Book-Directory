const express = require("express");
const app = express();
const port = 8080;
const hostname = "127.0.0.1";
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

mongoose.connect(
  "mongodb+srv://arin:toor@nodedemo.b8xph.mongodb.net/bookDir?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  }
);

// app.engine(
//   "hbs",
//   engine({
//     extname: "hbs",
//     defaultName: "main",
//     handlebars: allowInsecurePrototypeAccess(Handlebars),
//   })
// );
// app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "hbs");

app.use(fileUpload());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   console.log("Ana Sayfaya Bağlandı !");
//   res.sendFile("./view/index.html", { root: __dirname });
// });

const index = require("./routes/index");
const admin = require("./routes/admin/admin");
const users = require("./routes/users");
const books = require("./routes/books");
const singleBook = require("./routes/single-book");

app.use("/", index);
app.use("/admin", admin);
app.use("/users", users);
app.use("/books", books);
app.use("/book", singleBook);

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port} Adresine Bağlandı.`);
});

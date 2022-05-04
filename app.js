const express = require("express");
const app = express();
const hostname = "localhost";
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { generateDate, limit } = require("./helpers/helper");
const session = require("express-session");
const connectMongo = require("connect-mongo");
const mongoStore = connectMongo(session);
const methodOverride = require("method-override");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      autoReconnect: true,
    }),
  })
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
    helpers: {
      generateDate: generateDate,
      limit: limit,
    },
  })
);
app.set("view engine", "hbs");

app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals = {
      displayLink: true,
    };
  } else {
    res.locals = {
      displayLink: false,
    };
  }
  next();
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(methodOverride("_method"));

// app.get("/", (req, res) => {
//   console.log("Ana Sayfaya Bağlandı !");
//   res.sendFile("./view/index.html", { root: __dirname });
// });

const index = require("./routes/books");
const admin = require("./routes/admin/index");
const users = require("./routes/users");
const books = require("./routes/books");
const categories = require("./routes/categories");
const singleBook = require("./routes/single-book");
const adminContent = require("./routes/admin/admin-content");

app.use("/", index);
app.use("/admin", admin);
app.use("/users", users);
app.use("/books", books);
app.use("/book", singleBook);
app.use("/admin", adminContent);
app.use("/books", categories);

app.listen(process.env.PORT, hostname, () => {
  console.log(`http://${hostname}:${process.env.PORT} Adresine Bağlandı.`);
});

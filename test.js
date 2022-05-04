const mongoose = require("mongoose");
const Book = require("./models/Book");

mongoose.connect(
  "mongodb+srv://arin:toor@nodedemo.b8xph.mongodb.net/bookDir?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  }
);

Book.create({
  title: "Ahmet Ay",
  author: "ahmet@ay.com",
  publisher: "asd",
});

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  book_image: { type: String, require: true },
  date: { type: Date, default: Date.now, require: true },
  // book_image: { type: String },
});
module.exports = mongoose.model("Book", PostSchema);

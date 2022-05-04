const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  catName: { type: String, required: true},
  cat_image: { type: String, required: true },
});

module.exports = mongoose.model("Category", CategorySchema);

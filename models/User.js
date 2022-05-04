const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  psw: { type: String, required: true },
});

module.exports = mongoose.model("Users", userSchema);

const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.get("/register", (req, res) => {
  res.render("admin/register");
});

module.exports = router;

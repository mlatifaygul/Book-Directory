const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/login", (req, res) => {
  res.render("admin/login");
});
router.get("/register", (req, res) => {
  res.render("admin/register");
});
router.get("/profil", (req, res) => {
  res.render("admin/profil");
});

router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    req.session.sessionFlash = {
      type: "alert alert-succes",
      message: "Kadyıdınız başarıyla oluşturuldu.",
    };
    res.redirect("/users/login");
  });
});

router.post("/login", (req, res) => {
  const { email, psw } = req.body;

  User.findOne({ email }, (err, user) => {
    if (user) {
      if (user.psw == psw) {
        req.session.userId = user._id;
        req.session.sessionFlash = {
          type: "alert alert-succes",
          message: "Başarıyla giriş yaptınız.",
        };
        res.redirect("/admin/books");
      } else {
        req.session.sessionFlash = {
          type: "alert alert-succes",
          message: "Hatalı şifre tekrar deneyiniz.",
        };
        res.redirect("/users/login");
      }
    } else {
      req.session.sessionFlash = {
        type: "alert alert-succes",
        message: "Böyle bir kayıt bulunamadı. Kayıt olun lütfen.",
      };
      res.redirect("/users/register");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/books");
  });
});

module.exports = router;

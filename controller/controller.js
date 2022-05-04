const Book = require("../models/Book");

exports.create = (req, res) => {
  if (!req.body) {
    res.this.status(400).send({ message: "Content can not be emptpy!" });
    return;
  }
  const book = new Bookdb({
    author: req.body.author,
    title: req.body.title,
    publisher: req.body.publisher,
    book_image: req.body.book_image,
  });

  book
  .save(book)
  .then(data=>{
      res.send(data)
  })
  .catch(err=> {
      res.status(500).send({
          message:err.message||"Error "
      })
  })


};

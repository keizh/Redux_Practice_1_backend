const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  bookName: String,
  bookAuthor: String,
  bookGenre: String,
});

const BookModel = new mongoose.model("Book", BookSchema);

module.exports = BookModel;

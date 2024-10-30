const BookRouter = require("express").Router();
const { isEqualsGreaterThanToken } = require("typescript");
const BookModel = require("../models/Book.js");

BookRouter.post("/addBook", async (req, res) => {
  const { bookAuthor, bookName, bookGenre } = req.body;
  const newBook = new BookModel({ bookAuthor, bookName, bookGenre });
  try {
    const newBookSaved = await newBook.save();
    if (newBookSaved) {
      res.status(201).json({ message: "Book added", newBookSaved });
    } else {
      res.status(404).json({ message: "Failed to add Book", newBookSaved });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
});

BookRouter.get("/fetchBook", async (req, res) => {
  try {
    const booksFetched = await BookModel.find();
    if (booksFetched && booksFetched.length > 0) {
      res
        .status(200)
        .json({ message: "Books Fetched successfully", booksFetched });
    } else {
      res.status(500).json({ message: "No Books", booksFetched });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
});

BookRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (deletedBook) {
      res
        .status(200)
        .json({ message: "Book Successfully Deleted", deletedBook });
    } else {
      res.status(400).json({ message: "Failed to Delete Book", deletedBook });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
});

BookRouter.post("/update", async (req, res) => {
  const { _id, bookName, bookAuthor, bookGenre } = req.body;
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(
      _id,
      { $set: { bookName, bookAuthor, bookGenre } },
      { new: true }
    );
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book Updated Successfully", updatedBook });
    } else {
      res.status(400).json({ message: "Failed to update book", updatedBook });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
});

module.exports = BookRouter;

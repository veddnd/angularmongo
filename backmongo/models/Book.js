const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  }
}, {
  timestamps: true // it will auto add createdAt and updatedAt fields
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

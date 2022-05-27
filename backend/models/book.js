const mongoose = require('mongoose')
const validator = require('validator')

const Book = mongoose.model('Book', {
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
  submittedRatings: {
    type: Array,
    default: []
  },
  currentUserRank: {
    type: Number,
    default: 1,
    required: true
  }
})

module.exports = Book
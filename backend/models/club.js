const mongoose = require('mongoose')
const validator = require('validator')

const Club = mongoose.model('Club', {
  clubName: {
    type: String,
    required: true,
    trim: true
  },
  users: {
    type: Array,
    default: []
  },
  currentRound: {
    type: String,
    required: true
  }
})

module.exports = Club
const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  currentAdminRounds: {
    type: Array,
    default: []
  },
  currentVotingRounds: {
    type: Array,
    default: []
  },
  roundsAlreadyVotedOn: {
    type: Array,
    default: []
  }
})

module.exports = User
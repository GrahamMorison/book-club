const mongoose = require('mongoose')
const validator = require('validator')

const enumArr = [
  {1: 'Pre-Voting'},
  {2: 'Voting Completed'},
  {3: 'Closed'}
]

const VotingRound = mongoose.model('VotingRound', {
  books: {
    type: Array,
    default: []
  },
  users: {
    type: Array,
    default: []
  },
  usersThatVoted: {
    type: Array,
    default: []
  },
  stage: {
    type: Number,
    default: 1
  },
  clubName: {
    type: String,
    default: ''
  }
  // clubNameId: {
  //   type: String,
  //   required: true
  // }
})

module.exports = VotingRound
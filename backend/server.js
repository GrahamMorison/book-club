const path = require('path')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const axios = require('axios')
const publicDirectoryPath = path.join(__dirname, '/frontend/build')
const port = process.env.PORT || 3000

const VotingRound = require('./models/votingRound')
const User = require('./models/user')

dotenv.config();
app.use(express.json())


mongoose.connect(process.env.MONGODB_URL)
  .then(console.log('Connected to Mongo'))
  .catch(err => console.log(err))

app.post('/votingRounds', async (req, res) => {
  const votingRound = new VotingRound(req.body)

  try {
    await votingRound.save()
    res.status(201).send(votingRound)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.put('/votingRounds/:id', async (req,res) => {
  try {
    const votingRound = await VotingRound.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    
    if(!votingRound) {
      return res.status(404).send()
    }

    res.send(votingRound)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if(!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// app.get('/votingRounds/:name', async (req, res) => {
//   try {
//     const votingRounds = await VotingRound.find({})
//     res.send(votingRounds)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

app.get('/votingRounds/:id', async (req, res) => {
  const _id = req.params.id
    try {
      const round = await VotingRound.findById(_id)

      if(!round) {
        return res.status(404).send()
      }
      res.send(round)
    } catch (e) {
      res.status(500).send(e)
    }
})

app.delete('/votingRounds/:id', async (req, res) => {
  try {
    const round = await VotingRound.findByIdAndDelete(req.params.id)

    if(!round) {
      return res.status(400).send()
    }

    res.send(round)
  } catch (e) {
    res.status(500).send()
  }
})

app.get('/users/:name', async (req, res) => {
  const name = req.params.name

  try {
    const users = await User.find({ name })
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
})

app.get('/bookRequest/:book', async (req, res) => {
  console.log(req.params)
  console.log(req.params.book)

  const url = 'https://www.googleapis.com/books/v1/volumes?q=' + req.params.book + '&key=' + process.env.GOOGLEBOOKS_API_KEY
  console.log(url)
  try {
    const response = await axios.get(url)
    console.log(response.data)
    if (!response) {
      return res.status(404).send()
    }

    res.send(response.data)

  } catch (e) {
    res.status(500).send('')
  }
})

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  
  try {
    const user = await User.findById(_id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch {
    res.status(500).send()
  }
})

app.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({})
//     if(!users) {
//       res.status(404).send()
//     }
//     res.send(users)
//   } catch {
//     res.status(500).send()
//   }
// })

app.use(express.static(publicDirectoryPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
}); 

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
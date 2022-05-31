const path = require('path')
const express = require('express')
require('./backend/db/mongoose')
const VotingRound = require('./backend/models/votingRound')
const User = require('./backend/models/user')

const app = express()
const port = process.env.PORT

// const publicDirectoryPath = path.resolve(__dirname, './frontend/build')
app.use(express.json())

app.use(express.static(path.resolve(__dirname, './frontend/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});

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

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
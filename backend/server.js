require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const cors = require('cors');
// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
const dburi='mongodb+srv://kobenkhaoua:takeiteasy@mernapp.gxh9rto.mongodb.net/?retryWrites=true&w=majority&appName=Mernapp';
mongoose.connect(dburi)
  .then(() => {
    // listen for requests
    app.listen(4000, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

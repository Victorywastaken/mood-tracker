//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Mood = require('./models/Mood')
const Activities = require('./models/Activities')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Mood,
    Activities
  },
}

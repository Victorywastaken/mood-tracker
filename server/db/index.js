//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Mood = require('./models/Mood')
const Activity = require('./models/Activity')

//associations could go here!
User.hasMany(Mood)
Mood.belongsTo(User)

User.hasMany(Activity)
Activity.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Mood,
    Activity
  },
}

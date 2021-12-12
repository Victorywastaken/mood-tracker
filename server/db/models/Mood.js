const Sequelize = require('sequelize')
const db = require('../db')

const Mood = db.define('mood', {
  mood: {
    type: Sequelize.ENUM({
      values: ['great', 'good', 'meh', 'bad', 'awful']
    })
  },
  description: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Mood;

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

Mood.beforeValidate((mood) => {
  //if mood was already created today, don't allow it to be created again
  if(mood.date){
    if (mood.date.getDate() === new Date().getDate()) {
      throw new Error('You already created a mood for today!')
    }
  }
})

module.exports = Mood;

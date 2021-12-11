const Sequelize = require('sequelize')
const db = require('../db')

const Activities = db.define('activities', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
})

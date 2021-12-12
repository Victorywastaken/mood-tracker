const router = require('express').Router();
const { models: { Activity }} = require('../db');
const Sequelize = require('sequelize');
const { requireToken } = require('./middleware/gateGuardian')
module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    const activities = await Activity.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name'],
      ],
      where: {
        userId: user.id
      }
    });
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

router.post('/batch', requireToken, async (req, res, next) => {
  try {
    const { user, activities } = req.body;
    console.log(user);

    for(const activity of activities){
      activity.userId = user.id;
    }

    const bulkActivity = await Activity.bulkCreate(activities, {
      individualHooks: true,
      returning: true
    });

    res.send(bulkActivity);
  } catch (error) {
    next(error);
  }
  });

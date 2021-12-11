const router = require('express').Router();
const { models: { Activity }} = require('../db');
const { requireToken } = require('./middleware/gateGuardian')
module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    const activities = await Activity.findAll({
      where: {
        userId: user.id
      }
    });
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

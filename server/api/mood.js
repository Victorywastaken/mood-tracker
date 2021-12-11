const router = require('express').Router();
const { models: { Mood } } = require('../db');
const { requireToken } = require('./middleware/gateGuardian');
module.exports = router;

router.post('/', requireToken, async (req, res, next) => {
  try {
    const user = req.body.user
    const { mood } = req.body;
    // const user = req.body;
    const newMood = await Mood.create({
      userId: user.id,
      mood
    });
    res.status(201).send(newMood);
  } catch (error) {
    next(error);
  }
});

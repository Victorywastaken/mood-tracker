const router = require("express").Router();
// const Op = require('sequelize').Op;
// const TODAY_START = new Date().setHours(0, 0, 0, 0);
// const NOW = new Date();
const {
  models: { Mood },
} = require("../db");
const { requireToken } = require("./middleware/gateGuardian");
module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    let moods = await Mood.findAll({
      where: {
        userId: user.id,
      },
    });
    res.send(moods);
  } catch (error) {
    next(error);
  }
});

router.get("/today", requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    let todaysMoods = await Mood.findOne({
      where: {
        userId: user.id,
        // createdAt: {
        //   [Op.gte]: TODAY_START,
        //   [Op.lt]: NOW,
        // }
        date: new Date().toISOString().slice(0, 10),
      },
    });
    res.send(todaysMoods);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    const { mood, description, user } = req.body;
    const newMood = await Mood.create({
      userId: user.id,
      mood,
      description,
    });
    res.status(201).send(newMood);
  } catch (error) {
    next(error);
  }
});

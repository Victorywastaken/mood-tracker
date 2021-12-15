const router = require("express").Router();
// const Op = require('Sequelize').Op;
// const TODAY_START = new Date().setHours(0, 0, 0, 0);
// const NOW = new Date();
const {
  models: { Activity },
} = require("../db");
const Sequelize = require("sequelize");
const { requireToken } = require("./middleware/gateGuardian");
module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    const activities = await Activity.findAll({
      where: {
        userId: user.id,
      },
    });
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

router.get("/categories", requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    const activities = await Activity.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("name")), "name"]],
      where: {
        userId: user.id,
      },
    });
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

router.get("/today", requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    const todaysActivity = await Activity.findAll({
      where: {
        userId: user.id,
        // createdAt: {
        //   [Op.gte]: TODAY_START,
        //   [Op.lt]: NOW,
        // }
        date: new Date().toISOString().slice(0, 10),
      },
    });
    res.send(todaysActivity);
  } catch (error) {
    next(error);
  }
});

router.post("/batch", requireToken, async (req, res, next) => {
  try {
    const { user, activities } = req.body;

    for (const activity of activities) {
      activity.userId = user.id;
    }

    console.log(activities);

    const bulkActivity = await Activity.bulkCreate(activities, {
      individualHooks: true,
      returning: true,
    });

    res.send(bulkActivity);
  } catch (error) {
    next(error);
  }
});

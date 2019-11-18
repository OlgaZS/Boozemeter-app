const express = require("express");
const mongoose = require("mongoose");
const { Event, healthTypesArray } = require("../models/Event");
const { drinkTypesArray } = require("../models/Drink");
const { checkIfLoggedIn } = require("../middlewares/index");
const getDrink = require("../helpers/getDrink");
const {
  getDateStartTimestamp,
  getDateEndTimestamp,
  getFormattedDateString
} = require("../helpers/getDate");

const router = express.Router();

/* Events route:
/events - shows events for current user
*/

router.get("/events", checkIfLoggedIn, async (req, res, next) => {
  const userId = req.session.currentUser._id;
  if (!userId) return res.status(401).json({ code: "unauthorized" });

  try {
    const events = await Event.find({ user: userId })
      .populate("drink")
      .sort({ date: -1 });
    return res.json(events);
  } catch (error) {
    next(error);
  }
});

/* Get one event by date */
router.get("/date-events/:date", checkIfLoggedIn, async (req, res, next) => {
  const userId = req.session.currentUser._id;
  if (!userId) return res.status(401).json({ code: "unauthorized" });

  const { date } = req.params;
  const parsedDate = parseInt(date);
  const startDate = getDateStartTimestamp(parsedDate);
  const endDate = getDateEndTimestamp(parsedDate);

  try {
    const events = await Event.find({
      user: userId,
      /* select only events that lies in period
			from startDate to endDate */
      date: { $gte: startDate, $lte: endDate }
    })
      .populate("drink")
      .sort({ date: -1 });
    return res.json(events);
  } catch (error) {
    next(error);
  }
});

/* Get statistics by user/by days*/

router.get(
  "/statistics/user/:days",
  checkIfLoggedIn,
  async (req, res, next) => {
    const userId = req.session.currentUser._id;
    if (!userId) return res.status(401).json({ code: "unauthorized" });

    const { days } = req.params; // comes from front-end in ms

    const periodEnd = new Date();
    /* date X days ago */
    const periodStart = new Date(
      periodEnd.getTime() - parseInt(days) * 24 * 60 * 60 * 1000
    );

    const calcFreqHealth = arr => {
      const sortedArr = arr.sort((itemA, itemB) => {
        return (
          arr.filter(filterItem => filterItem.health === itemA.health) -
          arr.filter(filterItem => filterItem.health === itemB.health).length
        );
      });
      return sortedArr.pop().health;
    };

    const calcFreqDrink = arr => {
      const sortedArr = arr.sort((itemA, itemB) => {
        return (
          arr.filter(filterItem => filterItem.drink.type === itemA.drink.type) -
          arr.filter(filterItem => filterItem.drink.type === itemB.drink.type)
            .length
        );
      });
      return sortedArr.pop().drink.type;
    };

    const calcBoozeTime = arr => {
      const days = [];
      arr.forEach(item => {
        const dateStr = getFormattedDateString(item.date);
        /*  only unique date
        strings in this array	 */
        if (!(days.indexOf(dateStr) > -1)) days.push(dateStr);
      });

      return days.length;
    };

    /* calculates money spent
		for single user or group */
    const calcMoneySpent = arr => {
      let money = 0;
      arr.forEach(item => {
        money = money + item.cost;
      });
      return money;
    };

    try {
      const events = await Event.find({
        user: userId,
        date: { $gte: periodStart, $lte: periodEnd }
      }).populate("drink");

      return res.json({
        boozeTime: calcBoozeTime(events),
        favDrink: calcFreqDrink(events),
        moneySpent: calcMoneySpent(events),
        freqHealth: calcFreqHealth(events)
      });
    } catch (error) {
      return res.status(500).json({ code: "internal error" });
    }
  }
);

router.get(
  "/statistics/group/:days",
  checkIfLoggedIn,
  async (req, res, next) => {
    const userId = req.session.currentUser._id;
    if (!userId) return res.status(401).json({ code: "unauthorized" });

    const { days } = req.params; // comes from front-end in ms

    const periodEnd = new Date();
    /* date X days ago */
    const periodStart = new Date(
      periodEnd.getTime() - parseInt(days) * 24 * 60 * 60 * 1000
    );

    const calcFreqHealth = arr => {
      const sortedArr = arr.sort((itemA, itemB) => {
        return (
          arr.filter(filterItem => filterItem.health === itemA.health) -
          arr.filter(filterItem => filterItem.health === itemB.health).length
        );
      });
      return sortedArr.pop().health;
    };

    const calcFreqDrink = arr => {
      const sortedArr = arr.sort((itemA, itemB) => {
        return (
          arr.filter(filterItem => filterItem.drink.type === itemA.drink.type) -
          arr.filter(filterItem => filterItem.drink.type === itemB.drink.type)
            .length
        );
      });
      return sortedArr.pop().drink.type;
    };

    const calcBoozeTime = arr => {
      const days = [];
      arr.forEach(item => {
        const dateStr = getFormattedDateString(item.date);
        /*  only unique date
        strings in this array	 */
        if (!(days.indexOf(dateStr) > -1)) days.push(dateStr);
      });

      return days.length;
    };

    /* calculates money spent
		for single user or group */
    const calcMoneySpent = arr => {
      let money = 0;
      arr.forEach(item => {
        money = money + item.cost;
      });
      return money;
    };

    try {
      const events = await Event.find({
        date: { $gte: periodStart, $lte: periodEnd }
      }).populate("drink");

      return res.json({
        boozeTime: calcBoozeTime(events),
        favDrink: calcFreqDrink(events),
        moneySpent: calcMoneySpent(events),
        freqHealth: calcFreqHealth(events)
      });
    } catch (error) {
      return res.status(500).json({ code: "internal error" });
    }
  }
);

/* Get one event by eventId */

router.get("/event/:eventId", checkIfLoggedIn, async (req, res, next) => {
  const userId = req.session.currentUser._id;
  if (!userId) return res.status(401).json({ code: "unauthorized" });

  const { eventId } = req.params;

  /* user can get only his own events */
  try {
    const foundEvent = await Event.findOne({
      _id: mongoose.Types.ObjectId(eventId),
      user: userId
    }).populate("drink");
    if (!foundEvent)
      return res.status(400).json({ code: "invalid income data" });
    return res.json(foundEvent);
  } catch (error) {
    next(error);
  }
});

/* Add/post event */
router.post("/events", checkIfLoggedIn, async (req, res, next) => {
  const { type, name, percentage, date, cost, volume, health } = req.body;
  const userId = req.session.currentUser._id;
  if (!userId) return res.status(401).json({ code: "unauthorized" });

  /* we check that all three properties come from front-end
	if not, send an error */
  let prepDrinkId;
  if (type && name && percentage) {
    /* helper method that gets drink ObjectId from Drink collection */
    prepDrinkId = await getDrink(res, type, name, percentage);
  } else {
    return res.status(400).json({ code: "Drink: invalid income data" });
  }

  /* building mongoose query object */
  const query = {
    user: userId,
    drink: prepDrinkId,
    date: date
  };

  if (cost) query.cost = parseInt(cost);

  /* because volume field on Event Schema is mandatory we need to
	check if volume value was specified from front-end. */
  if (volume) {
    query.volume = parseInt(volume);
  } else {
    return res.status(400).json({ code: "Volume: invalid income data" });
  }

  /* health field on Event Schema is optional,
	hawever we don't want random strings to be specified at
	this field. so we perform checks. */
  if (health) {
    if (healthTypesArray.indexOf(health) > -1) {
      query.health = health;
    } else {
      return res.status(400).json({ code: "Healt: invalid income data" });
    }
  }

  try {
    const newEvent = await Event.create(query);
    return res.json(newEvent);
  } catch (error) {
    next(error);
  }
});

/* delete post event */
router.delete("/events/:eventId", checkIfLoggedIn, async (req, res, next) => {
  const userId = req.session.currentUser._id;
  if (!userId) return res.status(401).json({ code: "unauthorized" });

  const { eventId } = req.params;

  /* user can delete only his own events */
  try {
    const deletedEvent = await Event.findOneAndDelete({
      _id: mongoose.Types.ObjectId(eventId),
      user: userId
    });
    if (!deletedEvent)
      return res.status(400).json({ code: "invalid income data" });
    return res.json(deletedEvent);
  } catch (error) {
    next(error);
  }
});

/* rendering available labels on front-end */
router.get("/drink", async (req, res) => {
  return res.json(drinkTypesArray);
});

/* rendering available labels on front-end */
router.get("/health", async (req, res) => {
  return res.json(healthTypesArray);
});

module.exports = router;

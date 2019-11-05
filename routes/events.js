const express = require("express");
const { Event, healthTypesArray } = require("../models/Event");
const User = require("../models/User");
const { Drink, drinkTypesArray } = require("../models/Drink");
const { checkIfLoggedIn } = require("../middlewares/index");

const router = express.Router();

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
    });
    if (!foundEvent)
      return res.status(400).json({ code: "invalid income data" });
    return res.json(foundEvent);
  } catch (error) {
    next(error);
  }
});

/* Delete post event */

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

module.exports = router;

/* GET this day event listing. */
// //const today = new Date().toISOString().slice(0, 10);

// router.get("/events", checkIfLoggedIn, async (req, res, next) => {
//   const owner = res.locals.currentUser._id;
//   const { day } = req.body;

//   //db.events.find({day: {"$gte": new Date("2019-10-31"), "$lt": new Date("2019-11-01")}}) - asi funciona en BD para hacer la busqueda
//   try {
//     const events = await Event.find({ day: day });
//     //const events = await Event.find({day: {"$gte": new Date(day), "$lt": new Date(dayBefore)}});
//     res.json(events);
//   } catch (error) {
//     next(error);
//   }
// });

// /* Add/post event */

// router.post("/events", checkIfLoggedIn, async (req, res, next) => {
//   const { alcohol, money, quantity, health } = req.body;
//   const owner = req.session.currentUser._id;

//   try {
//     const event = await Event.create({
//       user: owner,
//       alcohol,
//       money,
//       quantity,
//       health
//     });
//     res.json(event);
//   } catch (error) {
//     next(error);
//   }
// });

/* update event */

// router.put("/events/:eventId", checkIfLoggedIn, async (req, res, next) => {
//   const { eventId } = req.params;
//   const { alcohol, money, quantity, health } = req.body;
//   try {
//     const event = await Event.findByIdAndUpdate(eventId, {
//       alcohol,
//       money,
//       quantity,
//       health
//     });
//     res.json(event);
//   } catch (error) {
//     next(error);
//   }
// });

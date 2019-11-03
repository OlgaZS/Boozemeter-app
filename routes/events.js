const express = require("express");
const Event = require("../models/Event");
const User = require("../models/User");
const { checkIfLoggedIn } = require("../middlewares/index");

const router = express.Router();

/* GET this day event listing. */
//const today = new Date().toISOString().slice(0, 10);

router.get("/events", checkIfLoggedIn, async (req, res, next) => {
  const owner = res.locals.currentUser._id;
  const { day } = req.body;

  //db.events.find({day: {"$gte": new Date("2019-10-31"), "$lt": new Date("2019-11-01")}}) - asi funciona en BD para hacer la busqueda
  try {
    const events = await Event.find({ day: day });
    //const events = await Event.find({day: {"$gte": new Date(day), "$lt": new Date(dayBefore)}});
    res.json(events);
  } catch (error) {
    next(error);
  }
});

/* Add/post event */

router.post("/events", checkIfLoggedIn, async (req, res, next) => {
  const { alcohol, money, quantity, health } = req.body;
  const owner = req.session.currentUser._id;

  try {
    const event = await Event.create({
      user: owner,
      alcohol,
      money,
      quantity,
      health
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
});
/* update event */

router.put("/:eventId", checkIfLoggedIn, async (req, res, next) => {
  const { eventId } = req.params;
  const { alcohol, money, quantity, health } = req.body;
  try {
    const event = await Event.findByIdAndUpdate(eventId, {
      alcohol,
      money,
      quantity,
      health
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
});

/* delet post event */

router.delete("/:eventId", checkIfLoggedIn, async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findByIdAndDelete(eventId);
    res.json(event);
  } catch (error) {
    next(error);
  }
});

// router.delete("/:bookId/delete", checkIfLoggedIn, (req, res, next) => {
//   const { bookId } = req.params;
//   Book.findByIdAndDelete(bookId)
//     .then(() => {
//       res.redirect("/books");
//     })
//     .catch(next);
// });

module.exports = router;

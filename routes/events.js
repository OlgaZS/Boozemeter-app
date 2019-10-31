const express = require("express");
const Event = require("../models/Event");
const User = require("../models/User");
const { checkIfLoggedIn } = require("../middlewares/index");

const router = express.Router();

/* GET event listing. */
router.get("/events", checkIfLoggedIn, async (req, res, next) => {
  try {
    const event = await Event.find(day).populate("user");
    res.json(event);
  } catch (error) {
    next(error);
  }
});

/* Add/post event */
// router.post("/events", checkIfLoggedIn, async (req, res, next) => {
//   const { alcohol, money, quantity, health } = req.body;
//   try {
//     const event = await Event.create({
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

module.exports = router;

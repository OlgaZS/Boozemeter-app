const mongoose = require("mongoose");
const { Drink, drinkTypesArray } = require("../models/Drink");

const getDrink = async (res, drinkType, drinkName, percentage) => {
  try {
    const drink = await Drink.findOne({ type: drinkType, name: drinkName });
    if (drink) return drink._id;
    if (drinkTypesArray.indexOf(drinkType) === -1)
      return res.status(400).json({ code: "invalid income data" });
    const newDrink = await Drink.create({
      type: drinkType,
      name: drinkName,
      percentage: parseInt(percentage)
    });
    return newDrink._id;
  } catch (error) {
    return res.status(400).json({ code: "invalid income data" });
  }
};

module.exports = getDrink;

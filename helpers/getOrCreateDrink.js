const mongoose = require("mongoose");
const { Drink, drinkTypesArray } = require("../models/Drink");

const getOrCreateDrink = async (
  res,
  drinkId,
  drinkType,
  drinkName,
  percentage
) => {};

module.exports = getOrCreateDrink;

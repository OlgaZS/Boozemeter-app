const mongoose = require("mongoose");
const { Schema } = mongoose;

drinkTypesArray = [
  "Beer",
  "Wine",
  "Cider",
  "Liquor",
  "Vodka",
  "Cubata",
  "Tequila",
  "Short",
  "Coctail"
];

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = {
  Drink,
  drinkTypesArray
};

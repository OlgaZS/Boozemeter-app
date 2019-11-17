const mongoose = require("mongoose");
const { Schema } = mongoose;

const drinkTypesArray = [
  "Beer",
  "Wine",
  "Cider",
  "Liquor",
  "Vodka",
  "Cubata",
  "Tequila",
  "SCognac",
  "Cocktail"
];

const drinkSchema = new Schema(
  /* name: drink name ('Martini', 'Jameson', 'Heineken' etc.) 	*/
  {
    name: {
      type: String,
      required: true
    },
    /* type: more broad drink type category ("Beer","Wine",	"Cider", etc.)*/
    type: {
      type: String,
      enum: drinkTypesArray,
      required: true
    },
    /* percentage: alcohol %% in the drink.	*/
    percentage: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = { Drink, drinkTypesArray }; //only export Drink, if not have mongoose error

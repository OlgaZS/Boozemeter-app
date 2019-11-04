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

const drinkSchema = new Schema(
  /* name: drink name ('Martini', 'Jameson', 'Heineken' etc.) needs to be specified by user at the time of drink creation	*/
  {
    name: {
      type: String,
      required: true
    },
    /* type: more broad drink type category ("Beer","Wine",	"Cider", etc.) needs to be specified by user at the time of drink creation	*/
    type: {
      type: String,
      enum: drinkTypesArray,
      required: true
    },
    /* percentage: alcohol %% in the drink. needs to be specified by user at the time of drink creation	*/
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

module.exports = {
  Drink,
  drinkTypesArray
};

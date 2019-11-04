const mongoose = require("mongoose");
const User = require("../models/User");
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: User },
    day: {
      type: Date,
      default: Date.now
    },
    alcohol: {
      type: String,
      enum: [
        "Beer",
        "Wine",
        "Cider",
        "Liquor",
        "Vodka",
        "Cubata",
        "Tequila",
        "Short",
        "Coctail"
      ]
    },
    money: { type: Number, required: true },
    quantity: { type: Number, required: true }, // define if it's units o mililiters
    health: {
      type: String,
      enum: [
        "Vomiting",
        "Hangover", // 🤯
        "Insomnia",
        "Stomach pain",
        "All is fine"
      ]
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

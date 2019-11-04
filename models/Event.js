const mongoose = require("mongoose");
const User = require("../models/User");
const Drink = require("../models/Drink");
const { Schema } = mongoose;

const healthTypesArray = [
  "Vomiting",
  "Hangover",
  "Insomnia",
  "Stomach pain",
  "All is fine"
];

const eventSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true
    },
    /*to create custom drink names within certain drink type constraints.*/
    drink: {
      type: Schema.Types.ObjectId,
      ref: Drink,
      required: true
    },
    day: {
      type: Date,
      default: Date.now
    },
    cost: {
      type: Number,
      required: true
    },
    // in mililiters
    volume: {
      type: Number,
      required: true
    },
    health: {
      type: String,
      enum: healthTypesArray
    }
  },
  {
    timestamps: true
  }
);

/* GET /api/events endpoint sends data in descending order.
	So we need to define index in DB for faster sorting
	reference:
	https://docs.mongodb.com/manual/indexes/
	*/
eventSchema.index({ date: -1 });

const Event = mongoose.model("Event", eventSchema);
module.exports = { Event, healthTypesArray };

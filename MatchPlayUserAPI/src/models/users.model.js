const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    handicap: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    playingRange: {
      lower: { type: Number, required: true },
      upper: { type: Number, required: true },
    },
    drinkingSmoking: {
      drinks: { type: Boolean, required: true },
      smokes: { type: Boolean, required: true },
      neither: { type: Boolean, required: true },
      noSmokers: { type: Boolean, required: true },
      noDrinkers: { type: Boolean, required: true },
    },
    musicPrefs: {
      must: { type: Boolean, required: true },
      indifferent: { type: Boolean, required: true },
      none: { type: Boolean, required: true },
    },
    timePrefs: {
      weekendDaytime: { type: Boolean, required: true },
      weekendTwilight: { type: Boolean, required: true },
      weekdayDaytime: { type: Boolean, required: true },
      weekdayTwilight: { type: Boolean, required: true },
    },
  },
  { collection: "user_profiles" }
);

module.exports = mongoose.model("User", userSchema);

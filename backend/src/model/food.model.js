const { model } = require("mongoose");
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  foodParnter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodParnter",
  },
});

const foodModel = mongoose.model("Food", foodSchema);

module.exports = foodModel;

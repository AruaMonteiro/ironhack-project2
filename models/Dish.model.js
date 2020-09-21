const { Schema, model } = require("mongoose");

const dishSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "./images/marmita.jpeg",
    },
    description: String,
    userId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Dish", dishSchema);

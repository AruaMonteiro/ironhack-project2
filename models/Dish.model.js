const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dv4g4kubs/image/upload/v1600870552/photos/default.jpg",
    },
    description: String,
    userId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dish", dishSchema);

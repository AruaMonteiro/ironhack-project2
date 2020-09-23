const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    region: {
      type: String,
      lowercase: true,
      trim: true,
    },
    site: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      minlength: 8,
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dv4g4kubs/image/upload/v1600870552/photos/default.jpg",
    },
    category: [String],
    description: { type: String, default: "Insira a descrição do seu restaurante aqui" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);

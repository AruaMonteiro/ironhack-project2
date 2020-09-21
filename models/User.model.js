const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
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
    category: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);

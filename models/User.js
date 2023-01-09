const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    first_name: String,
    last_name: String,
    phone_number: String,
    address: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);

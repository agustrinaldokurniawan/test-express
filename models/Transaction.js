const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Transaction = new Schema(
  {
    cart: {
      type: String,
      required: true,
    },
    duitku_response: {
      type: Object,
      required: true,
    },
    paid_response: {
      type: Object,
    },
    anonymous: {
      first_name: String,
      last_name: String,
      address: String,
      phone_number: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "payment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", Transaction);

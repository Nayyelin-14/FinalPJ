const { Schema, model } = require("mongoose");

const bidsSchema = new Schema(
  {
    product_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    seller_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commented_userID: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment_msg: {
      required: true,
      type: String,
    },
    phone_number: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const bidsModal = model("Bids", bidsSchema);

module.exports = bidsModal;

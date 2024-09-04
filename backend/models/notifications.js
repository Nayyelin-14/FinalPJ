const { Schema, model } = require("mongoose");

const notiSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String,
    },
    product_id: {
      type: String,
      required: true,
    },

    owner_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    phone_number: {
      type: String,
      required: true,
    },
    isRead: {
      default: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
const notiModal = model("Notification", notiSchema);

module.exports = notiModal;

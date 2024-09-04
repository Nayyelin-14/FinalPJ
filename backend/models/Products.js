const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    product_name: {
      required: true,
      type: String,
    },
    product_description: {
      required: true,
      type: String,
    },
    product_price: {
      required: true,
      type: String,
    },
    product_category: {
      required: true,
      type: String,
    },
    product_used_for: {
      required: true,
      type: String,
    },
    product_details: {
      type: Array,
    },
    product_status: {
      type: String,
      default: "Pending",
    },
    images: {
      type: [String],
    },
    product_seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, //user modal nk chate
  },
  {
    timestamps: true,
  }
);
const productModal = model("Product", productSchema);

module.exports = productModal;

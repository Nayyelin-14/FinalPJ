const { Schema, model } = require("mongoose");

const SavedProductSchema = new Schema(
  {
    user_id: {
      required: true,
      type: Schema.Types.ObjectId,
      //       is commonly used to define a field in a Mongoose schema that will store an ObjectId, typically used to reference documents in other collections
      ref: "User",
    },
    product_id: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);
const SavedproductsModel = model("Savedproducts", SavedProductSchema);

module.exports = SavedproductsModel;

const { validationResult } = require("express-validator");
const Product = require("../models/Products");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const SaveProducts = require("../models/SavedProduct");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addNewProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].message,
    });
  }
  const {
    product_category,
    product_description,
    product_details,
    product_name,
    product_price,
    product_used_for,
  } = req.body;

  try {
    const productDoc = await Product.create({
      product_name: product_name,
      product_category: product_category,
      product_used_for: product_used_for,
      product_details: product_details,
      product_description: product_description,
      product_price: product_price,
      product_seller: req.userID,
    });
    return res.status(201).json({
      isSuccess: true,
      message: "Product added to sell-list succefully",
      Product_data: productDoc,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getAllproducts = async (req, res, next) => {
  // console.log(req.userID);

  try {
    const productDoc = await Product.find({
      product_seller: req.userID,
    }).sort({
      createdAt: -1,
    });
    // console.log("prodcut selling", productDoc);
    if (productDoc.length) {
      return res.status(200).json({
        isSuccess: true,
        message: "Product fetched",
        productData: productDoc,
      });
    } else {
      return res.status(422).json({
        isSuccess: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getOldproduct = async (req, res, next) => {
  try {
    const OldDoc = await Product.findOne({ _id: req.params.oldProid });
    if (OldDoc) {
      return res.status(200).json({
        isSuccess: true,
        message: "Product found",
        oldProduct: OldDoc,
      });
    }
    // console.log(OldDoc);
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.Update_Product = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].message,
    });
  }
  try {
    // console.log("to edit", req.body);
    const {
      product_description,
      product_category,
      product_details,
      product_name,
      product_price,
      product_used_for,
      product_seller,
      seller_ID,
      product_ID,
    } = req.body;
    if (req.userID !== seller_ID) {
      throw new Error("Authorization failed");
    }
    const proDoc_toUpdate = await Product.findOne({ _id: product_ID });
    if (proDoc_toUpdate) {
      proDoc_toUpdate.product_category = product_category;
      proDoc_toUpdate.product_used_for = product_used_for;
      proDoc_toUpdate.product_name = product_name;
      proDoc_toUpdate.product_details = product_details;
      proDoc_toUpdate.product_description = product_description;
      proDoc_toUpdate.product_price = product_price;
      proDoc_toUpdate.save();
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Product updated successfully",
      proDoc_toUpdate,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.delete_product = async (req, res, next) => {
  const { deleteID } = req.params;

  try {
    const proDoc_todelete = await Product.findOne({ _id: deleteID });
    // console.log("to delete", proDoc_todelete);
    // console.log("to delete", proDoc_todelete.product_seller);
    // console.log(req.userID);
    const DELETE_image = proDoc_todelete.images;

    if (req.userID !== proDoc_todelete.product_seller) {
      throw new Error("Failed to delete");
    }

    if (DELETE_image.length > 0 && Array.isArray(DELETE_image)) {
      const deletePromise = DELETE_image.map((img) => {
        const publicID = img.substring(
          img.lastIndexOf("/") + 1,
          img.lastIndexOf(".")
        );
        // +1 ka one character after "/"
        //https://res.cloudinary.com/dqvsnnqg1/image/upload/v1723991129/ [ wpx6u4dzsxjqsul87so6 ].png
        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicID, (err, result) => {
            if (err) {
              reject("Failed to delete");
            } else {
              resolve(result);
            }
          });
        });
      });
      await Promise.all(deletePromise);
    }

    await Product.findByIdAndDelete(deleteID);
    return res.status(202).json({
      isSuccess: true,
      message: "Product removed",
      proDoc_todelete,
    });
  } catch (error) {
    return res.status(202).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.uploadProduct_Images = async (req, res) => {
  const productImages = req.files;
  const productId = req.body.editProductId;
  let secureUrlArray = [];
  // console.log(productImages);
  // console.log(productId);
  const productDoc = await Product.findOne({ _id: productId });
  // console.log(productDoc);
  if (req.userID !== productDoc.product_seller) {
    throw new Error("Authorization Failed.");
  }

  try {
    // Use Promise.all to wait for all uploads to complete
    const uploadPromises = productImages.map(
      (img) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload(img.path, (err, result) => {
            // img.path: This is the file path to the image that you want to upload.
            if (err) {
              reject(new Error("Cloud upload Failed."));
            } else {
              secureUrlArray.push(result.secure_url);
              resolve();
              // The resolve() function is then called to indicate that the Promise has been fulfilled successfully
            }
          });
        })
    );

    await Promise.all(uploadPromises);
    // Wait for all uploads to finish
    if (productImages.length === secureUrlArray.length) {
      await Product.findByIdAndUpdate(productId, {
        $push: { images: secureUrlArray },
      });
      return res.status(200).json({
        isSuccess: true,
        message: "Product images saved.",
        secureUrlArray,
      });
    } else {
      throw new Error("Failed to upload images");
    }
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.get_ProductImages = async (req, res) => {
  const { product_id } = req.params;

  try {
    const Product_doc = await Product.findById(product_id).select("images");

    if (!Product_doc) {
      throw new Error("Product images not found");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Product images are fetched",
      images_data: Product_doc,
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.delete_saved_img = async (req, res) => {
  // console.log(req.params);

  try {
    const productId = req.params.productId;
    const deleteimgId = decodeURIComponent(req.params.deleteimgId);

    const public_ID_ToDelete = deleteimgId.substring(
      deleteimgId.lastIndexOf("/") + 1,
      deleteimgId.lastIndexOf(".")
    );

    await cloudinary.uploader.destroy(public_ID_ToDelete);

    await Product.findByIdAndUpdate(productId, {
      $pull: { images: deleteimgId },
    });
    return res.status(200).json({
      isSuccess: true,
      message: "Product images are destroyed",
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.saveProduct = async (req, res) => {
  const { pID } = req.params;
  try {
    // req.userID
    const saved = await SaveProducts.findOne({
      $and: [{ user_id: req.userID }, { product_id: pID }],
    });
    if (saved) {
      throw new Error("Selected product is already saved");
    }
    const save_Doc = await SaveProducts.create({
      user_id: req.userID,
      product_id: pID,
    });
    return res.status(200).json({
      isSuccess: true,
      message: "Product saved",
      save_Doc,
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.get_saveProduct = async (req, res) => {
  try {
    // req.userID
    const saved_productDOC = await SaveProducts.find({
      user_id: req.userID,
    }).populate(
      "product_id",
      "product_name product_description product_price product_category product_used_for product_details images product_seller"
    );
    if (!saved_productDOC || saved_productDOC.length === 0) {
      throw new Error("No product saved here");
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Saved products are loaded",
      saved_productDOC,
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.deletesavedProduct = async (req, res) => {
  try {
    const { productID } = req.params;

    const unsaved_doc = await SaveProducts.findOneAndDelete({
      product_id: productID,
    });

    if (!unsaved_doc) {
      throw new Error("Error occured");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Selected product unsaved",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

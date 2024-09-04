const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator");
const productController = require("../controllers/Product");
const bidsController = require("../controllers/bids");
const notiController = require("../controllers/Notification");
//add product
//POST , create
router.post(
  "/create-product",
  authMiddleware,
  [
    body("product_name").trim().notEmpty().withMessage("Enter product name"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Enter product description"),

    body("product_price").trim().notEmpty().withMessage("Enter product price"),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Enter product category"),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("Enter product used-time"),
    body("product_details").isArray().withMessage("Enter product details"),
  ],

  productController.addNewProduct
);

//get all products
router.get("/products", authMiddleware, productController.getAllproducts);

//get single old product data
router.get(
  "/product/:oldProid",
  authMiddleware,
  productController.getOldproduct
);

//update product
//POST -> /updateProduct
router.post(
  "/updateProduct",
  authMiddleware,
  [
    body("product_name").trim().notEmpty().withMessage("Enter product name"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Enter product description"),

    body("product_price").trim().notEmpty().withMessage("Enter product price"),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Enter product category"),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("Enter product used-time"),
    body("product_details").isArray().withMessage("Enter product details"),
  ],
  productController.Update_Product
);

router.delete(
  "/products/:deleteID",
  authMiddleware,
  productController.delete_product
);

//upload photo
router.post(
  "/uploadImage",
  authMiddleware,
  productController.uploadProduct_Images
);

//get product images
//GET -> "/product-image/:product_id"
router.get(
  "/product-image/:product_id",
  authMiddleware,
  productController.get_ProductImages
);

//delete saved images
//DELETE => /products/images/destory/:produuctId/:deleteimgId
router.delete(
  "/products/images/destory/:productId/:deleteimgId",
  authMiddleware,
  productController.delete_saved_img
);

//save product
//POST / saved-products/:pID
router.post(
  "/saved-products/:pID",
  authMiddleware,
  productController.saveProduct
);

//get save product
//GET / getsaved-products/:pID
router.get(
  "/getsaved-products",
  authMiddleware,
  productController.get_saveProduct
);
// /deletesaved-product/${productID}
router.delete(
  "/deletesaved-product/:productID",
  authMiddleware,
  productController.deletesavedProduct
);

//Post -> add bids
router.post(
  "/add-bids",
  [
    body("message").trim().notEmpty().withMessage("Leave message"),
    body("phone").trim().notEmpty().withMessage("Enter phone number"),
  ],
  authMiddleware,
  bidsController.saveBids
);

router.get("/bids/:Pid_forbids", bidsController.get_AllBids);

router.post("/notify", authMiddleware, notiController.pushNotifications);

router.get("/notifications", authMiddleware, notiController.getNotifications);

router.get(
  "/notification-read/:noti_id",
  authMiddleware,
  notiController.markasRead
);

router.delete(
  "/notification-deleteOne/:notiId",
  authMiddleware,
  notiController.deleteSingleNoti
);
module.exports = router;

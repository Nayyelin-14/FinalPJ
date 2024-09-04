const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator");
const adminMiddleware = require("../middleware/isAdmin");
const adminController = require("../controllers/admin");

//GET allproducts from admin side
//GET -> /admin/products
router.get(
  "/admin/products",
  authMiddleware,
  adminMiddleware,
  adminController.get_AllProduct_admin
);

//approve product
//POST -> /admin/product-approve/:productID
router.post(
  "/admin/product-approve/:product_ID",
  authMiddleware,
  adminMiddleware,
  adminController.aprroveProduct
);

//reject product
//POST -> /admin/product-reject/:productID
router.post(
  "/admin/product-reject/:product_ID",
  authMiddleware,
  adminMiddleware,
  adminController.rejectProduct
);

//pending product
//POST -> /admin/product-pending/:productID
router.post(
  "/admin/product-pending/:product_ID",
  authMiddleware,
  adminMiddleware,
  adminController.pendingProduct
);

// get all users
//GET -> /users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  adminController.get_allUsers
);

//pending product
//POST -> /admin/user-status-ban/:userId
router.post(
  "/admin/user-status-ban/:userId",
  authMiddleware,
  adminMiddleware,
  adminController.ban_user
);

//pending product
//POST -> /admin/user-status/:userId
router.post(
  "/admin/user-status-unban/:userId",
  authMiddleware,
  adminMiddleware,
  adminController.unban_user
);
module.exports = router;

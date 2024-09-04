const express = require("express");
const router = express.Router();
const publicController = require("../controllers/Public");
//get all products
// GET -> "/api/products"
router.get("/products", publicController.getProducts);

//get filtered products
//GET -> "/api/products/filtered"
router.get("/products/filtered", publicController.filteredProducts);

//get product detail by id
router.get("/product/:productID", publicController.productDetail);
module.exports = router;

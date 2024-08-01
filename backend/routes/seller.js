var express = require("express");
var router = express.Router();
var { uploadShopLogo, uploadProductImage } = require("../upload");

var {
  createShop,
  showShop,
  updateShop,
  deleteShop,
} = require("../controllers/seller/shop");

router.post("/shop/create", uploadShopLogo, createShop);
router.get("/shop/show", showShop);
router.put("/shop/update", uploadShopLogo, updateShop);
router.delete("/shop/delete", deleteShop);

var {
  createProduct,
  showProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/seller/product");

router.post("/product/create", uploadProductImage, createProduct);
router.get("/product/show", showProduct);
router.put("/product/update", uploadProductImage, updateProduct);
router.delete("/product/delete", deleteProduct);

module.exports = router;

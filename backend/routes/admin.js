var express = require("express");
var router = express.Router();

// Site Management
var {
  listSite,
  createSite,
  updateSite,
  showSite,
  deleteSite,
} = require("../controllers/admin/site");

router.get("/site/list", listSite);
router.post("/site/create", createSite);
router.put("/site/update", updateSite);
router.get("/site/show", showSite);
router.delete("/site/delete", deleteSite);

// Role Management
var {
  listRole,
  createRole,
  updateRole,
  showRole,
  deleteRole,
} = require("../controllers/admin/user");

router.get("/role/list", listRole);
router.post("/role/create", createRole);
router.put("/role/update", updateRole);
router.get("/role/show", showRole);
router.delete("/role/delete", deleteRole);

// User Management 
var {
  listUser,
  showUser,
  deleteUser,
  updateUser,
} = require("../controllers/admin/user");

router.get("/user/list", listUser);
router.get("/user/show", showUser);
router.delete("/user/delete", deleteUser);
router.put("/user/update", updateUser);

// Product Category Management
var {
  listProductCategory,
  createProductCategory,
  updateProductCategory,
  showProductCategory,
  deleteProductCategory,
} = require("../controllers/admin/product");

router.get("/product/category/list", listProductCategory);
router.post("/product/category/create", createProductCategory);
router.put("/product/category/update", updateProductCategory);
router.get("/product/category/show", showProductCategory);
router.delete("/product/category/delete", deleteProductCategory);

// Shop Management
var { listShop, showShop, deleteShop } = require("../controllers/admin/shop");

router.get("/shop/list", listShop);
router.get("/shop/show", showShop);
router.delete("/shop/delete", deleteShop);

// Product Management
var {
  listProduct,
  createProduct,
  updateProduct,
  showProduct,
  deleteProduct,
} = require("../controllers/admin/product");

router.get("/product/list", listProduct);
router.post("/product/create", createProduct);
router.put("/product/update", updateProduct);
router.get("/product/show", showProduct);
router.delete("/product/delete", deleteProduct);

// Product Review Management
var {
  listReview,
  showReview,
  createReview,  // createReview rotasını ekledik
  deleteReview,
} = require("../controllers/admin/review");

router.get("/product/review/list", listReview);
router.get("/product/review/show", showReview);
router.post("/product/review/create", createReview);  // createReview rotasını ekledik
router.delete("/product/review/delete", deleteReview);

module.exports = router;

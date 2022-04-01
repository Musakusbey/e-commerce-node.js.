var mongoose = require("mongoose");
var { productSchema, productCategorySchema } = require("../../models/product");
var { shopSchema } = require("../../models/shop");

mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

const Product = mongoose.model("Product", productSchema);
const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);
const Shop = mongoose.model("Shop", shopSchema);

// Create Product
async function createProduct(req, res, next) {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    address: {
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      postCode: req.body.postCode,
      street: req.body.street,
    },
    shop: req.query.shopID,
  });
  newProduct.save();

  // Add product to shop
  await Shop.findByIdAndUpdate(req.query.shopID, {
    $push: { products: newProduct._id },
  });

  // Add categories
  const categoryIDs = req.body.categories.match(/\w+/g);
  for (const categoryID in categoryIDs) {
    // update product
    await Product.findByIdAndUpdate(newProduct._id, {
      $push: { categories: categoryID },
    });

    // update product category
    await ProductCategory.findByIdAndUpdate(categoryID, {
      $push: { products: newProduct._id },
    });
  }

  // Add images
  for (const productImage in req.body.files["images"]) {
    await Product.findByIdAndUpdate(
      newProduct._id,
      { $push: { images: productImage.path } },
      { new: true }
    );
  }

  res.json(newProduct);
}

// Show Product
async function showProduct(req, res, next) {
  res.json(await Product.findById(req.query.productID));
}

// Update Product
async function updateProduct(req, res, next) {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.query.productID,
    {
      name: req.body.name,
      price: {
        number: req.body.priceNumber,
        currency: req.body.priceCurrency,
      },
      description: req.body.description,
      address: {
        country: req.body.country,
        province: req.body.province,
        city: req.body.city,
        postCode: req.body.postCode,
        street: req.body.street,
      },
    },
    { new: true }
  );

  res.json(updatedProduct);
}

// Delete Product
async function deleteProduct(req, res, next) {
  const deletedProduct = await Product.findByIdAndRemove(req.query.productID);
  await Shop.findByIdAndUpdate(deletedProduct.shop._id, {
    $pull: { products: deletedProduct._id },
  });
  res.json(deletedProduct);
}

// Add product category
async function addProductCategory(req, res, next) {
  // update product
  const updatedProduct = await Product.findByIdAndUpdate(req.query.productID, {
    $push: { categories: req.query.categoryID },
  });

  // update product category
  await ProductCategory.findByIdAndUpdate(req.query.categoryID, {
    $push: { products: req.query.productID },
  });

  res.json(updatedProduct);
}

// Remove product category
async function removeProductCategory(req, res, next) {
  // update product
  const updatedProduct = await Product.findByIdAndUpdate(req.query.productID, {
    $push: { categories: req.query.categoryID },
  });

  // update product category
  await ProductCategory.findByIdAndUpdate(req.query.categoryID, {
    $push: { products: req.query.productID },
  });

  res.json(updatedProduct);
}

// Add product image
async function addProductImage(req, res, next) {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.query.productID,
    { $push: { images: req.file.path } },
    { new: true }
  );
  res.json(updatedProduct);
}

// Remove product image
async function removeProductImage(req, res, next) {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.query.productID,
    { $pull: { images: req.file.path } },
    { new: true }
  );
  res.json(updatedProduct);
}

module.exports = {
  createProduct,
  showProduct,
  updateProduct,
  deleteProduct,
  addProductCategory,
  removeProductCategory,
  addProductImage,
  removeProductImage,
};

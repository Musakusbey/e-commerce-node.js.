const supabase = require('../../supabase');

// Create Product
async function createProduct(req, res, next) {
  // Create new product
  const { data: newProduct, error: productError } = await supabase
    .from('products')
    .insert({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      shop_id: req.query.shopID,
      categories: req.body.categories.match(/\w+/g), // Assuming categories are sent as a space-separated string
      images: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
    })
    .single();

  if (productError) {
    return res.status(500).json({ error: productError.message });
  }

  res.json(newProduct);
}

// Show Product
async function showProduct(req, res, next) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('id', req.query.productID)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(product);
}

// Update Product
async function updateProduct(req, res, next) {
  const { data: updatedProduct, error: updateError } = await supabase
    .from('products')
    .update({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      categories: req.body.categories.match(/\w+/g),
      images: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
    })
    .eq('id', req.query.productID)
    .single();

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  res.json(updatedProduct);
}

// Delete Product
async function deleteProduct(req, res, next) {
  const { data: deletedProduct, error: deleteError } = await supabase
    .from('products')
    .delete()
    .eq('id', req.query.productID)
    .single();

  if (deleteError) {
    return res.status(500).json({ error: deleteError.message });
  }

  res.send("Product Deleted!");
}

// Add product category
async function addProductCategory(productID, categoryID) {
  const { data: product, error } = await supabase
    .from('products')
    .select('categories')
    .eq('id', productID)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const updatedCategories = [...product.categories, categoryID];

  await supabase
    .from('products')
    .update({ categories: updatedCategories })
    .eq('id', productID);
}

// Remove product category
async function removeProductCategory(productID, categoryID) {
  const { data: product, error } = await supabase
    .from('products')
    .select('categories')
    .eq('id', productID)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const updatedCategories = product.categories.filter(cat => cat !== categoryID);

  await supabase
    .from('products')
    .update({ categories: updatedCategories })
    .eq('id', productID);
}

// Add product image
async function addProductImage(productID, path) {
  const { data: product, error } = await supabase
    .from('products')
    .select('images')
    .eq('id', productID)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const updatedImages = [...product.images, path];

  await supabase
    .from('products')
    .update({ images: updatedImages })
    .eq('id', productID);
}

// Remove product images
async function removeProductImages(productID) {
  await supabase
    .from('products')
    .update({ images: [] })
    .eq('id', productID);
}

module.exports = {
  createProduct,
  showProduct,
  updateProduct,
  deleteProduct,
};

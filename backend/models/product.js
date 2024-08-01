const supabase = require('../supabase');

// Create Product
async function createProduct(data) {
  const { data: product, error } = await supabase
    .from('Product')
    .insert([data])
    .single();

  if (error) throw error;
  return product;
}

// Get Product by ID
async function getProductById(productId) {
  const { data: product, error } = await supabase
    .from('Product')
    .select('*, ProductCategory(*), Review(*)')
    .eq('id', productId)
    .single();

  if (error) throw error;
  return product;
}

// Update Product by ID
async function updateProduct(productId, data) {
  const { data: product, error } = await supabase
    .from('Product')
    .update(data)
    .eq('id', productId)
    .single();

  if (error) throw error;
  return product;
}

// Delete Product by ID
async function deleteProduct(productId) {
  const { data, error } = await supabase
    .from('Product')
    .delete()
    .eq('id', productId)
    .single();

  if (error) throw error;
  return data;
}

// Add Category to Product
async function addCategoryToProduct(productId, categoryId) {
  const { data, error } = await supabase
    .from('Product_ProductCategory')
    .insert([{ product_id: productId, category_id: categoryId }]);

  if (error) throw error;
  return data;
}

// Remove Category from Product
async function removeCategoryFromProduct(productId, categoryId) {
  const { data, error } = await supabase
    .from('Product_ProductCategory')
    .delete()
    .eq('product_id', productId)
    .eq('category_id', categoryId);

  if (error) throw error;
  return data;
}

// Add Image to Product
async function addProductImage(productId, path) {
  const { data, error } = await supabase
    .from('Product')
    .update({ images: supabase.rpc('array_append', { array: 'images', value: path }) })
    .eq('id', productId);

  if (error) throw error;
  return data;
}

// Remove Product Images
async function removeProductImages(productId) {
  const { data, error } = await supabase
    .from('Product')
    .update({ images: [] })
    .eq('id', productId);

  if (error) throw error;
  return data;
}

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  addCategoryToProduct,
  removeCategoryFromProduct,
  addProductImage,
  removeProductImages
};

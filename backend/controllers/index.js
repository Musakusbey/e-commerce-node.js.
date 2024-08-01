const supabase = require('../supabase');

// Retrieve website information
async function showSite(req, res, next) {
  const { data, error } = await supabase
    .from('sites')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

// Retrieve all product categories
async function listAllCategories(req, res, next) {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

// Retrieve recently created products
async function listRecentProducts(req, res, next) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(15);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

// Retrieve recently created shops
async function listRecentShops(req, res, next) {
  const { data, error } = await supabase
    .from('shops')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(15);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

// Retrieve one single product category
async function showCategory(req, res, next) {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .eq('id', req.query.categoryID);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
}

// Retrieve one single shop
async function showShop(req, res, next) {
  const { data, error } = await supabase
    .from('shops')
    .select('*')
    .eq('id', req.query.shopID);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
}

// Retrieve one single product
async function showProduct(req, res, next) {
  const { data, error } = await supabase
    .from('products')
    .select('*, reviews(*)')
    .eq('id', req.query.productID);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
}

// Add review to a product
async function addProductReview(req, res, next) {
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.query.productID)
    .single();

  if (productError) {
    return res.status(500).json({ error: productError.message });
  }

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.query.userID)
    .single();

  if (userError) {
    return res.status(500).json({ error: userError.message });
  }

  const { data: newReview, error: reviewError } = await supabase
    .from('reviews')
    .insert([
      {
        rating: req.body.rating,
        content: req.body.content,
        product_id: product.id,
        user_id: user.id,
      },
    ]);

  if (reviewError) {
    return res.status(500).json({ error: reviewError.message });
  }

  res.json(newReview[0]);
}

// Remove product review
async function removeProductReview(req, res, next) {
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .delete()
    .eq('id', req.query.reviewID)
    .single();

  if (reviewError) {
    return res.status(500).json({ error: reviewError.message });
  }

  res.json(review);
}

module.exports = {
  showSite,
  listAllCategories,
  listRecentProducts,
  listRecentShops,
  showCategory,
  showShop,
  showProduct,
  addProductReview,
  removeProductReview,
};

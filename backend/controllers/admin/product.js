const supabase = require('../../supabase');


// Product Category Management =============================================
async function listProductCategory(req, res, next) {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function createProductCategory(req, res, next) {
  const { data, error } = await supabase
    .from('product_categories')
    .insert([{ name: req.body.name }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
}

async function updateProductCategory(req, res, next) {
  const { data, error } = await supabase
    .from('product_categories')
    .update({ name: req.body.name })
    .eq('id', req.query.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
}

async function showProductCategory(req, res, next) {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*, products(*)')
    .eq('id', req.query.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
}

async function deleteProductCategory(req, res, next) {
  const { data, error } = await supabase
    .from('product_categories')
    .delete()
    .eq('id', req.query.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
}

// Product Management =======================================================
async function listProduct(req, res, next) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function showProduct(req, res, next) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.query.productID);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
}

async function deleteProduct(req, res, next) {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', req.query.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
}

module.exports = {
  listProductCategory,
  createProductCategory,
  updateProductCategory,
  showProductCategory,
  deleteProductCategory,
  listProduct,
  showProduct,
  deleteProduct,
};

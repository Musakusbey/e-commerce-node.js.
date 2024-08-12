const supabase = require('../../supabase');

// Product Category Management =================================================
async function listProductCategory(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*');

    if (error) {
      throw error;
    }
    res.json(data);
  } catch (err) {
    console.error('Caught Exception in listProductCategory:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function createProductCategory(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .insert([{ name: req.body.name }]);

    if (error) {
      throw error;
    }
    res.json(data[0]);
  } catch (err) {
    console.error('Caught Exception in createProductCategory:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function updateProductCategory(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .update({ name: req.body.name })
      .eq('id', req.query.id);

    if (error) {
      throw error;
    }
    res.json(data[0]);
  } catch (err) {
    console.error('Caught Exception in updateProductCategory:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function showProductCategory(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*, products(*)')
      .eq('id', req.query.id);

    if (error) {
      throw error;
    }
    res.json(data[0]);
  } catch (err) {
    console.error('Caught Exception in showProductCategory:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function deleteProductCategory(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', req.query.id);

    if (error) {
      throw error;
    }
    res.json(data[0]);
  } catch (err) {
    console.error('Caught Exception in deleteProductCategory:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

// Product Management ==========================================================
async function listProduct(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('product')
      .select('*');

    if (error) {
      throw error;
    }
    res.json(data);
  } catch (err) {
    console.error('Caught Exception in listProduct:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function createProduct(req, res, next) {
  try {
    console.log('Request Body:', req.body);
    const { data, error } = await supabase
      .from('product')
      .insert([{
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        images: req.body.images || [],
        shop_id: req.body.shop_id,
      }]);

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }
    console.log('Insert Data:', data);
    res.json(data[0]);
  } catch (err) {
    console.error('Caught Exception in createProduct:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function updateProduct(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('product')
      .update({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        images: req.body.images || [],
        shop_id: req.body.shop_id, // shop_id alanını güncelliyoruz
      })
      .eq('id', req.query.id);

    if (error) {
      throw error;
    }
    res.json(data[0]);
  } catch (err) {
    console.error('Caught Exception in updateProduct:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function showProduct(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('id', req.query.id);

    if (error) {
      throw error;
    }
    res.json(data[0]);
  } catch (err) {
    console.error('Caught Exception in showProduct:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('product')
      .delete()
      .eq('id', req.query.id);

    if (error) {
      throw error;
    }
    res.json(data[0]);
  } catch (err) {
    console.error('Caught Exception in deleteProduct:', err);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
}

module.exports = {
  listProductCategory,
  createProductCategory,
  updateProductCategory,
  showProductCategory,
  deleteProductCategory,
  listProduct,
  createProduct,
  updateProduct,
  showProduct,
  deleteProduct,
};

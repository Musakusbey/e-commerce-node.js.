const supabase = require('../../supabase');

// Create new shop
async function createShop(req, res, next) {
  const { data: newShop, error: shopError } = await supabase
    .from('shops')
    .insert({
      name: req.body.name,
      user_id: req.query.userID,
      phone: req.body.phone,
      email: req.body.email,
      description: req.body.description,
      address: {
        country: req.body.country,
        province: req.body.province,
        city: req.body.city,
        postCode: req.body.postCode,
        street: req.body.street,
      },
    })
    .single();

  if (shopError) {
    return res.status(500).json({ error: shopError.message });
  }

  // If there is a new logo
  if (req.file) {
    const { error: logoError } = await supabase
      .from('shops')
      .update({ logo: req.file.path }) // req.file.path doğru olmalı
      .eq('id', newShop.id);

    if (logoError) {
      return res.status(500).json({ error: logoError.message });
    }
  }

  // Add shop to the user
  const { error: userError } = await supabase
    .from('users')
    .update({ shop_id: newShop.id })
    .eq('id', req.query.userID);

  if (userError) {
    return res.status(500).json({ error: userError.message });
  }

  res.send("Shop Created!");
}

// Show shop
async function showShop(req, res, next) {
  let query = supabase
    .from('shops')
    .select(req.query.withProducts === "true" ? '*, products(*)' : '*')
    .eq('id', req.query.shopID)
    .single();

  const { data: shop, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(shop);
}

// Update Shop
async function updateShop(req, res, next) {
  let updateData = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    description: req.body.description,
    address: {
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      postCode: req.body.postCode,
      street: req.body.street,
    },
  };

  // If there is a new logo
  if (req.file) {
    updateData.logo = req.file.path; // req.file.path doğru olmalı
  }

  const { error: updateError } = await supabase
    .from('shops')
    .update(updateData)
    .eq('id', req.query.shopID);

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  res.send("Shop Updated!");
}

// Delete Shop
async function deleteShop(req, res, next) {
  const { data: shop, error: shopError } = await supabase
    .from('shops')
    .select('*')
    .eq('id', req.query.shopID)
    .single();

  if (shopError) {
    return res.status(500).json({ error: shopError.message });
  }

  // Update user, remove shop from user
  const { error: userError } = await supabase
    .from('users')
    .update({ shop_id: null })
    .eq('id', shop.user_id);

  if (userError) {
    return res.status(500).json({ error: userError.message });
  }

  // Delete Shop
  const { error: deleteError } = await supabase
    .from('shops')
    .delete()
    .eq('id', req.query.shopID)
    .single();

  if (deleteError) {
    return res.status(500).json({ error: deleteError.message });
  }

  res.send("Shop Deleted!");
}

module.exports = {
  createShop,
  showShop,
  updateShop,
  deleteShop,
};

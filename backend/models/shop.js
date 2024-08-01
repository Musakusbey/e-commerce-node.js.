const supabase = require('../supabase');

// Create Shop
async function createShop(shop) {
  const { data, error } = await supabase
    .from('shop')
    .insert([shop])
    .single();

  if (error) throw error;
  return data;
}

// Get Shop by ID
async function getShopById(shopId) {
  const { data, error } = await supabase
    .from('shop')
    .select('*, user(*), products(*)')
    .eq('id', shopId)
    .single();

  if (error) throw error;
  return data;
}

// Update Shop
async function updateShop(shopId, updates) {
  const { data, error } = await supabase
    .from('shop')
    .update(updates)
    .eq('id', shopId)
    .single();

  if (error) throw error;
  return data;
}

// Delete Shop
async function deleteShop(shopId) {
  const { data, error } = await supabase
    .from('shop')
    .delete()
    .eq('id', shopId)
    .single();

  if (error) throw error;
  return data;
}

module.exports = {
  createShop,
  getShopById,
  updateShop,
  deleteShop,
};

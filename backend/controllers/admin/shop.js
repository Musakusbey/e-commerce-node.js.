const supabase = require('../../supabase');



// Shop Management ===================================================
async function listShop(req, res, next) {
  const { data, error } = await supabase
    .from('shops')
    .select('*, user(username)');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function showShop(req, res, next) {
  const { data, error } = await supabase
    .from('shops')
    .select('*')
    .eq('id', req.query.shopID)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function deleteShop(req, res, next) {
  const { data, error } = await supabase
    .from('shops')
    .delete()
    .eq('id', req.query.id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

module.exports = {
  listShop,
  showShop,
  deleteShop,
};

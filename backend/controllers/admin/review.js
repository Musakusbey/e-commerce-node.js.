const supabase = require('../../supabase');



// Product Review Management 
async function listReview(req, res, next) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, user(*), product(*)');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function showReview(req, res, next) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, user(*), product(*)')
    .eq('id', req.query.id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function deleteReview(req, res, next) {
  const { data, error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', req.query.id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

module.exports = {
  listReview,
  showReview,
  deleteReview,
};

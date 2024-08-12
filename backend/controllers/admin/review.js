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

async function createReview(req, res, next) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      rating: req.body.rating,
      comment: req.body.comment,
    }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0]);
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
  createReview,
  deleteReview,
};

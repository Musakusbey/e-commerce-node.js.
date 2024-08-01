const supabase = require('../supabase');

// Create Review
async function createReview(review) {
  const { data, error } = await supabase
    .from('review')
    .insert([review])
    .single();

  if (error) throw error;
  return data;
}

// Get Review by ID
async function getReviewById(reviewId) {
  const { data, error } = await supabase
    .from('review')
    .select('*, product(*), user(*)')
    .eq('id', reviewId)
    .single();

  if (error) throw error;
  return data;
}

// Update Review
async function updateReview(reviewId, updates) {
  const { data, error } = await supabase
    .from('review')
    .update(updates)
    .eq('id', reviewId)
    .single();

  if (error) throw error;
  return data;
}

// Delete Review
async function deleteReview(reviewId) {
  const { data, error } = await supabase
    .from('review')
    .delete()
    .eq('id', reviewId)
    .single();

  if (error) throw error;
  return data;
}

module.exports = {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
};

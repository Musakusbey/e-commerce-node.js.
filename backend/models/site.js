const supabase = require('../supabase');

// Create Site
async function createSite(site) {
  const { data, error } = await supabase
    .from('site')
    .insert([site])
    .single();

  if (error) throw error;
  return data;
}

// Get Site by ID
async function getSiteById(siteId) {
  const { data, error } = await supabase
    .from('site')
    .select('*')
    .eq('id', siteId)
    .single();

  if (error) throw error;
  return data;
}

// Update Site
async function updateSite(siteId, updates) {
  const { data, error } = await supabase
    .from('site')
    .update(updates)
    .eq('id', siteId)
    .single();

  if (error) throw error;
  return data;
}

// Delete Site
async function deleteSite(siteId) {
  const { data, error } = await supabase
    .from('site')
    .delete()
    .eq('id', siteId)
    .single();

  if (error) throw error;
  return data;
}

module.exports = {
  createSite,
  getSiteById,
  updateSite,
  deleteSite,
};

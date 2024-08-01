const supabase = require('../../supabase');



// Site Management ===================================================
async function listSite(req, res, next) {
  const { data, error } = await supabase
    .from('sites')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function createSite(req, res, next) {
  const { data, error } = await supabase
    .from('sites')
    .insert([req.body])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.send(data);
}

async function updateSite(req, res, next) {
  const { data, error } = await supabase
    .from('sites')
    .update({
      name: req.body.name,
      description: req.body.description,
      keywords: req.body.keywords,
    })
    .eq('id', req.query.siteID)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.send("Site Updated");
}

async function showSite(req, res, next) {
  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .eq('id', req.query.siteID)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function deleteSite(req, res, next) {
  const { data, error } = await supabase
    .from('sites')
    .delete()
    .eq('id', req.query.siteID)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

module.exports = {
  listSite,
  createSite,
  updateSite,
  showSite,
  deleteSite,
};

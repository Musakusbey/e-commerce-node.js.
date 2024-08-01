const supabase = require('../supabase');

// Create User
async function createUser(user) {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .single();

  if (error) throw error;
  return data;
}

// Get User by ID
async function getUserById(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Update User
async function updateUser(userId, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Delete User
async function deleteUser(userId) {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Role Management
async function createRole(role) {
  const { data, error } = await supabase
    .from('roles')
    .insert([role])
    .single();

  if (error) throw error;
  return data;
}

async function getRoleById(roleId) {
  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .eq('id', roleId)
    .single();

  if (error) throw error;
  return data;
}

async function updateRole(roleId, updates) {
  const { data, error } = await supabase
    .from('roles')
    .update(updates)
    .eq('id', roleId)
    .single();

  if (error) throw error;
  return data;
}

async function deleteRole(roleId) {
  const { data, error } = await supabase
    .from('roles')
    .delete()
    .eq('id', roleId)
    .single();

  if (error) throw error;
  return data;
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  createRole,
  getRoleById,
  updateRole,
  deleteRole,
};

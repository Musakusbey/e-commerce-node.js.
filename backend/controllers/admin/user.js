const supabase = require('../../supabase');



// Role Management ==========================================================
async function listRole(req, res, next) {
  const { data, error } = await supabase
    .from('roles')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function createRole(req, res, next) {
  const { data, error } = await supabase
    .from('roles')
    .insert([req.body])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.send(data);
}

async function updateRole(req, res, next) {
  const { data, error } = await supabase
    .from('roles')
    .update(req.body)
    .eq('id', req.query.id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function showRole(req, res, next) {
  const { data, error } = await supabase
    .from('roles')
    .select('*, users(*)')
    .eq('id', req.query.id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function deleteRole(req, res, next) {
  const { data, error } = await supabase
    .from('roles')
    .delete()
    .eq('id', req.query.id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

// User Management ==========================================================
async function listUser(req, res, next) {
  const { data, error } = await supabase
    .from('users')
    .select('*, shop(*), role(name)');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

// const createUser = async function (req, res, next) {
//   if ((await User.findOne({ email: req.body.email })) !== null) {
//     res.send("There is an existing account associated with this email.");
//   } else {
//     // Hash password
//     const hashedPass = await hashPass(req.body.password);

//     // Admin can pick user's role when creating a new user
//     const userRole = await Role.findOne({ name: req.body.role });

//     const { data: newUser, error: newUserError } = await supabase
//       .from('users')
//       .insert([
//         {
//           username: req.body.username,
//           email: req.body.email,
//           password: hashedPass,
//           role_id: userRole.id,
//         },
//       ])
//       .single();

//     if (newUserError) {
//       return res.status(500).json({ error: newUserError.message });
//     }

//     // Add the user to the corresponding role
//     await supabase
//       .from('roles')
//       .update({ users: [...userRole.users, newUser.id] })
//       .eq('id', userRole.id);

//     res.send({ newUser, updatedRole });
//   }
// };

async function updateUser(req, res, next) {
  // Admin can only change user's role

  // Remove the user from the old role
  const { data: oldUser, error: oldUserError } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.query.id)
    .single();

  if (oldUserError || !oldUser) {
    return res.status(500).json({ error: oldUserError.message });
  }

  await supabase
    .from('roles')
    .update({ users: oldUser.role.users.filter(userId => userId !== oldUser.id) })
    .eq('id', oldUser.role.id);

  const { data: newRole, error: newRoleError } = await supabase
    .from('roles')
    .select('*')
    .eq('name', req.body.role)
    .single();

  if (newRoleError) {
    return res.status(500).json({ error: newRoleError.message });
  }

  // Update the user model
  const { data: updatedUser, error: updateUserError } = await supabase
    .from('users')
    .update({ role_id: newRole.id })
    .eq('id', req.query.id)
    .single();

  if (updateUserError) {
    return res.status(500).json({ error: updateUserError.message });
  }

  // Add the user to the new role
  await supabase
    .from('roles')
    .update({ users: [...newRole.users, updatedUser.id] })
    .eq('id', newRole.id);

  res.json(updatedUser);
}

async function showUser(req, res, next) {
  const { data, error } = await supabase
    .from('users')
    .select('*, shop(*), role(name)')
    .eq('id', req.query.userID)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

async function deleteUser(req, res, next) {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', req.query.userID)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
}

module.exports = {
  listRole,
  createRole,
  updateRole,
  showRole,
  deleteRole,
  listUser,
  // createUser,
  updateUser,
  showUser,
  deleteUser,
};

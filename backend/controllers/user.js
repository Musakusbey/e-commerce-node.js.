const supabase = require('../supabase');
var { hashPass, authUser } = require("../auth");
const jwt = require("jsonwebtoken");

// User Registration
async function userRegister(req, res, next) {
  // Check if the user exists
  const { data: existingUser, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', req.body.email)
    .single();

  if (existingUser) {
    res.send("There is an existing account associated with this email.");
  } else {
    // Hash password
    const hashedPass = await hashPass(req.body.password);

    // Assign "user" role to the new user
    const { data: userRole, error: roleError } = await supabase
      .from('roles')
      .select('*')
      .eq('name', 'user')
      .single();

    const { data: newUser, error: newUserError } = await supabase
      .from('users')
      .insert([
        {
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
          role_id: userRole.id,
          name: "",
          avatar: "",
          phone: "",
          address: {
            country: "",
            province: "",
            city: "",
            postCode: "",
            street: "",
          },
        },
      ])
      .single();

    if (newUserError) {
      return res.status(500).json({ error: newUserError.message });
    }

    // Add the user to the "user" role
    await supabase
      .from('roles')
      .update({ users: [...userRole.users, newUser.id] })
      .eq('id', userRole.id);

    res.json(newUser);
  }
}

// User Login
async function userLogin(req, res, next) {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*, role(*)')
    .eq('email', req.body.email)
    .single();

  if (userError || !user) {
    return res.send("Username or password not correct.");
  }

  const match = await authUser(req.body.password, user.password);
  if (match) {
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role.name,
      },
      process.env.JWT_KEY
    );
    res.json(token);
  } else {
    res.send("Username or password not correct.");
  }
}

// Change user password
async function changePass(req, res, next) {
  // Verify old password
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', req.body.email)
    .single();

  if (userError || !user) {
    return res.send("Wrong password!");
  }

  const match = await authUser(req.body.oldPassword, user.password);
  if (match) {
    const hashedNewPass = await hashPass(req.body.newPassword);
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ password: hashedNewPass })
      .eq('email', req.body.email)
      .single();

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.json(updatedUser);
  } else {
    res.send("Wrong password!");
  }
}

// Show user profile
async function showUser(req, res, next) {
  const { data: user, error } = await supabase
    .from('users')
    .select('*, -password, -role')
    .eq('id', req.query.userID)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(user);
}

// Update user profile
async function updateUser(req, res, next) {
  try {
    // If there is a new avatar
    let avatarPath = null;
    if (req.file) {
      avatarPath = req.file.path; // Path update
      await supabase
        .from('users')
        .update({ avatar: avatarPath })
        .eq('id', req.query.userID);
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: {
          country: req.body.country,
          province: req.body.province,
          city: req.body.city,
          postCode: req.body.postCode,
          street: req.body.street,
        },
      })
      .eq('id', req.query.userID)
      .single();

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.send("User Updated!");
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  userRegister,
  userLogin,
  changePass,
  showUser,
  updateUser,
};

const supabase = require('../supabase');
var { hashPass, authUser } = require("../auth");
const jwt = require("jsonwebtoken");

// User Registration
async function userRegister(req, res, next) {
  try {
    console.log('Request body:', req.body);

    // Check if the user exists
    const { data: existingUsers, error: userError } = await supabase
      .from('user')
      .select('*')
      .eq('email', req.body.email);

    console.log('Existing users:', existingUsers, 'User error:', userError);

    if (userError) {
      return res.status(500).json({ error: userError.message });
    }

    if (existingUsers.length > 0) {
      return res.status(400).send("There is an existing account associated with this email.");
    } else {
      // Hash password
      const hashedPass = await hashPass(req.body.password);
      console.log('Hashed password:', hashedPass);

      const { data: newUser, error: newUserError } = await supabase
        .from('user')
        .insert([
          {
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
          },
        ])
        .single();

      console.log('New user:', newUser, 'New user error:', newUserError);

      if (newUserError) {
        return res.status(500).json({ error: newUserError.message });
      }

      res.json(newUser);
    }
  } catch (e) {
    console.error('Registration error:', e.message);
    res.status(500).json({ error: e.message });
  }
}

// User Login
async function userLogin(req, res, next) {
  try {
    console.log('Login request:', req.body);

    const { data: user, error: userError } = await supabase
      .from('user')
      .select('*')
      .eq('email', req.body.email)
      .single();

    console.log('User login:', user, 'User login error:', userError);

    if (userError || !user) {
      return res.status(400).send("Username or password not correct.");
    }

    const match = await authUser(req.body.password, user.password);
    console.log('Password match:', match);

    if (match) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_KEY
      );
      console.log('Generated token:', token);
      res.json(token);
    } else {
      res.status(400).send("Username or password not correct.");
    }
  } catch (e) {
    console.error('Login error:', e.message);
    res.status(500).json({ error: e.message });
  }
}

// Change user password
async function changePass(req, res, next) {
  try {
    console.log('Change password request:', req.body);

    // Verify old password
    const { data: user, error: userError } = await supabase
      .from('user')
      .select('*')
      .eq('email', req.body.email)
      .single();

    console.log('User found for password change:', user, 'User error:', userError);

    if (userError || !user) {
      return res.status(400).send("Wrong password!");
    }

    const match = await authUser(req.body.oldPassword, user.password);
    console.log('Old password match:', match);

    if (match) {
      const hashedNewPass = await hashPass(req.body.newPassword);
      console.log('New hashed password:', hashedNewPass);

      const { data: updatedUser, error: updateError } = await supabase
        .from('user')
        .update({ password: hashedNewPass })
        .eq('email', req.body.email)
        .single();

      console.log('Updated user:', updatedUser, 'Update error:', updateError);

      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      }

      res.json(updatedUser);
    } else {
      res.status(400).send("Wrong password!");
    }
  } catch (e) {
    console.error('Change password error:', e.message);
    res.status(500).json({ error: e.message });
  }
}

// Show user profile
async function showUser(req, res, next) {
  try {
    console.log('Show user profile request:', req.query);

    const { data: user, error } = await supabase
      .from('user')
      .select('*, -password')
      .eq('id', req.query.userID)
      .single();

    console.log('User profile:', user, 'User profile error:', error);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(user);
  } catch (e) {
    console.error('Show user profile error:', e.message);
    res.status(500).json({ error: e.message });
  }
}

// Update user profile
async function updateUser(req, res, next) {
  try {
    console.log('Update user request:', req.body);

    // If there is a new avatar
    let avatarPath = null;
    if (req.file) {
      avatarPath = req.file.path; // Path update
      await supabase
        .from('user')
        .update({ avatar: avatarPath })
        .eq('id', req.query.userID);
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('user')
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

    console.log('Updated user:', updatedUser, 'Update error:', updateError);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.send("User Updated!");
  } catch (e) {
    console.error('Update user profile error:', e.message);
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  userRegister,
  userLogin,
  changePass,
  showUser,
  updateUser,
};

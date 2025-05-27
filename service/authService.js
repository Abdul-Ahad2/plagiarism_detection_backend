const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid username or password');
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid username or password');

  // Generate JWT
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return { user, token };
};

module.exports = { register, login };

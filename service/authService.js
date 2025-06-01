import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (data) => {
  const existingEmail = await User.findOne({ email: data.email });
  if (existingEmail) throw new Error('Email already exists.');

  const existingUsername = await User.findOne({ username: data.username });
  if (existingUsername) throw new Error('Username already taken.');

  const user = new User(data);
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password.');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return { user, token };
};

export default { register, login };

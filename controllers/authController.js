import { z } from 'zod';
import authService from '../service/authService.js';
import { stringConstants } from '../utils/string.constants.js';
import { sendOtpToEmail, verifyOtp } from '../service/otpService.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const otpSchema = z.object({
  action: z.enum(['request', 'verify', 'reset']),
  email: z.string().email(),
  otp: z.string().optional(),
  newPassword: z.string().min(6).optional()
});

export const handleOtp = async (req, res) => {
  try {
    const { action, email, otp, newPassword } = otpSchema.parse(req.body);

    if (action === 'request') {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: stringConstants.PASSWORD_RESET.USER_NOT_FOUND });
      await sendOtpToEmail(email);
      return res.status(200).json({ message: stringConstants.PASSWORD_RESET.REQUEST_SUCCESS });
    }

    if (action === 'verify') {
      await verifyOtp(email, otp);
      return res.status(200).json({ message: stringConstants.PASSWORD_RESET.VERIFY_SUCCESS });
    }

    if (action === 'reset') {
      await verifyOtp(email, otp);
      const hashed = await bcrypt.hash(newPassword, 10);
      await User.updateOne({ email }, { password: hashed });
      return res.status(200).json({ message: stringConstants.PASSWORD_RESET.RESET_SUCCESS });
    }

    return res.status(400).json({ error: stringConstants.PASSWORD_RESET.UNKNOWN_ACTION });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['student', 'teacher', 'researcher'])
});

export const register = async (req, res) => {
  try {
    const userData = signupSchema.parse(req.body);
    const user = await authService.register(userData);
    res.status(201).json({ message: stringConstants.SIGNUP.SUCCESS, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });
  
  export const login = async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const { user, token } = await authService.login(email, password);
      res.status(200).json({ message: stringConstants.LOGIN.SUCCESS, token, user });
    } catch (error) {
      res.status(401).json({ error: stringConstants.LOGIN.INVALID_CREDENTIALS });
    }
  };
  export const setRole = async (req, res) => {
    const { email, role } = req.body;
  
    if (!['student', 'teacher', 'researcher'].includes(role)) {
      return res.status(400).json({ error: stringConstants.ROLE.SET_ERROR });
    }
  
    const user = await User.findOneAndUpdate({ email }, { role }, { new: true });
  
    if (!user) return res.status(404).json({ error: stringConstants.PASSWORD_RESET.USER_NOT_FOUND });
  
    res.status(200).json({ message: stringConstants.ROLE.SET_SUCCESS, user });
  };
  
  

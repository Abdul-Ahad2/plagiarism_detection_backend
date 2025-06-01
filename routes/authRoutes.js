import express from 'express';
import passport from 'passport';
import { register, login, handleOtp, setRole } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: "Too many OTP requests. Try again later." }
});

// Traditional Auth
router.post('/register', register);
router.post('/login', login);
router.post('/handle-otp', otpLimiter, handleOtp);
router.post('/set-role', setRole);

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    if (!req.user.role) {
      return res.redirect(`/choose-role?email=${req.user.email}`);
    }
    res.redirect('/dashboard');
  }
);

export default router;

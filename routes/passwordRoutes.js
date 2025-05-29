const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');
const rateLimit = require('express-rate-limit');

// Allow max 5 requests per 10 minutes per IP
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: { error: 'Too many OTP requests from this IP. Please try again later.' }
});

router.post('/forgot-password', otpLimiter, passwordController.requestOtp);
router.post('/forgot-password', passwordController.requestOtp);
router.post('/verify-otp', passwordController.verifyOtp);
router.post('/reset-password', passwordController.resetPassword);

module.exports = router;

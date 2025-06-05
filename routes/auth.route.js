import express from "express";
import { googleAuth } from "../controllers/auth.controller.js";
import { googleCallback } from "../controllers/auth.controller.js";
import {
  register,
  login,
  handleOtp,
  setRole,
} from "../controllers/auth.controller.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: "Too many OTP requests. Try again later." },
});

// Traditional Auth
router.post("/register", register);
router.post("/login", login);
router.post("/handle-otp", otpLimiter, handleOtp);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);


export default router;

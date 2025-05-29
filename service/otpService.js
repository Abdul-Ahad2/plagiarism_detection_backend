const Otp = require('../models/otp');
const nodemailer = require('nodemailer');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtpToEmail = async (email) => {
  const otpCode = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

  await Otp.findOneAndDelete({ email }); // remove previous OTPs
  await Otp.create({ email, otp: otpCode, expiresAt });

  // Send OTP using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otpCode}. It expires in 10 minutes.`
  });

  return true;
};

const verifyOtp = async (email, otp) => {
  const record = await Otp.findOne({ email, otp });

  if (!record || record.expiresAt < new Date()) {
    throw new Error('OTP is invalid or expired');
  }

  await Otp.deleteOne({ _id: record._id }); // OTP used → delete
  return true;
};

module.exports = { sendOtpToEmail, verifyOtp };

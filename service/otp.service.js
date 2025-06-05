import Otp from '../models/otp.model.js';
import nodemailer from 'nodemailer';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtpToEmail = async (email) => {
  const otpCode = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await Otp.findOneAndDelete({ email });
  await Otp.create({ email, otp: otpCode, expiresAt });
  const transporter = nodemailer.createTransport({
    service: "gmail.com",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otpCode}. It will expire in 10 minutes.`
  });
};

export const verifyOtp = async (email, otp) => {
  const record = await Otp.findOne({ email, otp });
  if (!record || record.expiresAt < new Date()) {
    throw new Error('OTP is invalid or expired');
  }
  await Otp.deleteOne({ _id: record._id }); // delete after successful use
};

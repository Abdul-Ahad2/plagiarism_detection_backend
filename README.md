# 🧠 Plagiarism Tester – Backend API

This backend system powers a plagiarism checker tool, featuring secure authentication (including Google login), OTP-based password resets, and role-based access control.

---

## 🚀 Features

### ✅ Authentication
- User Registration (email, username, password, role)
- User Login (username & password)
- Google Login (with one-time role setup: student, teacher, researcher)

### 🔐 Password Reset (OTP)
- Send OTP to registered email
- Verify OTP
- Reset password using OTP

### ⚙️ Rate Limiting
- OTP endpoint is rate-limited to prevent abuse (5 reqs/10 min)

---

## 🏗️ Project Structure

```
plagiarism-tester/
├── controller/
│   ├── authController.js
├── routes/
│   ├── authRoutes.js
├── services/
│   ├── authService.js
│   └── otpService.js
├── models/
│   ├── User.js
│   └── Otp.js
├── auth/
│   └── googleStrategy.js
├── index.js
├── .env
└── README.md
```

---

## 🛠️ Tech Stack

- Node.js / Express
- MongoDB / Mongoose
- Passport.js (Google OAuth)
- Bcrypt (password hashing)
- JSON Web Token (for login)
- Nodemailer (for sending OTP)
- express-rate-limit (rate limiting)

---

## 🔐 Environment Variables (.env)
```
MONGO_URI=mongodb://localhost:27017/plagiarism_tester
JWT_SECRET=your_jwt_secret_here

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:3000/api/auth/google/callback

SESSION_SECRET=some_secret_key
```

---

## 📋 API Endpoints Summary

### 🔑 Auth Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `POST /api/auth/set-role` 

### 🔐 Password Reset
- `POST /api/password/forgot-password`
- `POST /api/password/verify-otp`
- `POST /api/password/reset-password`



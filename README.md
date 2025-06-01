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
## 🧪 .env Setup

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/plagiarism
JWT_SECRET=your_jwt_secret

EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your16charapppassword

GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx
CALLBACK_URL=http://localhost:3000/api/auth/google/callback
SESSION_SECRET=your_cookie_secret
```

---

## 📌 API Endpoints & Payloads

### 🔐 Signup

**POST** `/api/auth/register`

```json
{
  "username": "ahad",
  "email": "ahad@example.com",
  "password": "secure123",
  "role": "student"
}
```

---

### 🔓 Login

**POST** `/api/auth/login`

```json
{
  "email": "ahad@example.com",
  "password": "secure123"
}
```

---

### 🔁 Forgot Password via OTP (Single Endpoint)

**POST** `/api/auth/handle-otp`

#### Request OTP:

```json
{
  "action": "request",
  "email": "ahad@example.com"
}
```

#### Verify OTP:

```json
{
  "action": "verify",
  "email": "ahad@example.com",
  "otp": "123456"
}
```

#### Reset Password:

```json
{
  "action": "reset",
  "email": "ahad@example.com",
  "otp": "123456",
  "newPassword": "newsecurepass"
}
```

---

### 🧭 Google Login

- **GET** `/api/auth/google` → starts OAuth flow
- **GET** `/api/auth/google/callback` → handles login

After first login, if the user's role is missing, frontend should call:

### 🧩 Set Role

**POST** `/api/auth/set-role`

```json
{
  "email": "ahad@example.com",
  "role": "teacher"
}
```

---

## 🚀 Run the Project

```bash
npm install
npm run dev
```

> Make sure MongoDB is running locally or use MongoDB Atlas.

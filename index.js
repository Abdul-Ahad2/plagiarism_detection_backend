import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import "./googleauth/google.strategy.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());

// cookie-session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET, // your session‐signing secret
    resave: false, // don’t save session if unmodified
    saveUninitialized: false, // don’t create a session until something is stored
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true, // prevent client‐side JavaScript from reading the cookie
      secure: false, // set true if you’re serving over HTTPS
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

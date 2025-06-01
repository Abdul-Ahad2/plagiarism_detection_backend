import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'cookie-session';
import passport from 'passport';
import './auth/googleStrategy.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());

// cookie-session setup
app.use(session({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000 // 1 day
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}))
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

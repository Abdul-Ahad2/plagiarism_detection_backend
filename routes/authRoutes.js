const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
require('../auth/googleStrategy');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true
  }),
  (req, res) => {
    if (!req.user.role) {
      // redirect frontend to ask for role
      return res.redirect(`/choose-role?email=${req.user.email}`);
    }

    // redirect to dashboard or wherever
    res.redirect('/dashboard');
  }
);
// POST /api/auth/set-role
//isko authcontroller mein dal do simple hai
router.post('/set-role', async (req, res) => {
    const { email, role } = req.body;
    if (!['student', 'teacher', 'researcher'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
  
    const user = await User.findOneAndUpdate({ email }, { role }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    res.status(200).json({ message: 'Role updated', user });
  });
  
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

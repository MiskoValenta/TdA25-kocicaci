const express = require('express');
const passport = require('passport');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// OAuth routes
router.get('/azure', passport.authenticate('azure_ad_oauth2'));

router.get('/azure/callback', passport.authenticate('azure_ad_oauth2', {
  failureRedirect: '/login',
  successRedirect: '/'
}));

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;
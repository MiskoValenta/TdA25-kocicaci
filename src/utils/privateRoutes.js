const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/private', authMiddleware, (req, res) => {
  res.json({ message: 'This is a private route' });
});

module.exports = router;
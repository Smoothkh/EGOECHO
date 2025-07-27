const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');
const { encrypt } = require('../utils/encryption');

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
}

router.post('/register', async (req, res) => {
  try {
    const { userId, password, nickname } = req.body;
    const user = new User({ userId, nickname });
    user.setPassword(password);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (!user || !user.validatePassword(password)) {
    if (user) {
      user.loginFailCount += 1;
      await user.save();
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  user.loginFailCount = 0;
  await user.save();

  await LoginLog.create({
    userId: user.userId,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  });

  const token = createToken(user.userId);
  res.json({ token });
});

router.patch('/gemini-key', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findOne({ userId: payload.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { geminiKey } = req.body;
    user.encryptedGeminiKey = encrypt(geminiKey);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;

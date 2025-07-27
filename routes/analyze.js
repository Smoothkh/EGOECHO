const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.post('/', auth, (req, res) => {
  const { content } = req.body;
  const aiScore = Math.floor(Math.random() * 101);
  const aiReview = `감정 점수는 ${aiScore}점입니다. 오늘도 수고하셨어요! 🙂`;
  res.json({ aiScore, aiReview });
});

module.exports = router;

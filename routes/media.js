const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Media = require('../models/Media');

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

router.post('/image', auth, async (req, res) => {
  const { diaryId, mediaId, base64 } = req.body;
  await Media.create({
    diaryId,
    userId: req.user.userId,
    writeDate: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
    mediaId,
    mediaType: 'image',
    mediaData: base64
  });
  res.json({ success: true });
});

router.post('/youtube', auth, async (req, res) => {
  const { diaryId, mediaId, url } = req.body;
  await Media.create({
    diaryId,
    userId: req.user.userId,
    writeDate: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
    mediaId,
    mediaType: 'youtube',
    mediaData: url
  });
  res.json({ success: true });
});

module.exports = router;

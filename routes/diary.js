const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Diary = require('../models/Diary');
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

let diaryCounter = 1;

router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const writeDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const writeTime = new Date().toISOString().slice(11, 16).replace(':', '');
    const diary = new Diary({
      diaryId: diaryCounter++,
      userId: req.user.userId,
      writeDate,
      writeTime,
      title,
      content
    });
    await diary.save();
    res.json({ diaryId: diary.diaryId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:diaryId', auth, async (req, res) => {
  const diary = await Diary.findOne({ diaryId: req.params.diaryId, userId: req.user.userId });
  if (!diary) return res.status(404).json({ error: 'Not found' });
  const media = await Media.find({ diaryId: diary.diaryId });
  res.json({ diary, media });
});

module.exports = router;

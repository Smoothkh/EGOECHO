const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  diaryId: { type: Number, required: true, unique: true },
  userId: { type: String, required: true },
  writeDate: { type: String, required: true }, // YYYYMMDD
  writeTime: { type: String, required: true }, // HHmm
  title: { type: String, required: true },
  content: { type: String, required: true },
  aiScore: { type: Number },
  aiReview: { type: String },
  createdAt: { type: Date, default: Date.now }
});

diarySchema.index({ userId: 1, writeDate: 1 }, { unique: true });

module.exports = mongoose.model('Diary', diarySchema);

const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  diaryId: { type: Number, required: true },
  userId: { type: String, required: true },
  writeDate: { type: String, required: true },
  mediaId: { type: String, required: true },
  mediaType: { type: String, enum: ['image', 'youtube'], required: true },
  mediaData: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

mediaSchema.index({ diaryId: 1, mediaId: 1 }, { unique: true });

module.exports = mongoose.model('Media', mediaSchema);

const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  nickname: { type: String, required: true },
  encryptedGeminiKey: { type: String },
  delYn: { type: Boolean, default: false },
  useYn: { type: Boolean, default: true },
  loginFailCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.setPassword = function(password) {
  this.passwordHash = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
};

userSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
  return this.passwordHash === hash;
};

module.exports = mongoose.model('User', userSchema);

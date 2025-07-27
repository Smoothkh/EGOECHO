const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  loginAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String }
});

module.exports = mongoose.model('LoginLog', loginLogSchema);

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const diaryRoutes = require('./routes/diary');
const mediaRoutes = require('./routes/media');
const analyzeRoutes = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/egoecho';

app.use(bodyParser.json());

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    app.use('/api/user', userRoutes);
    app.use('/api/diary', diaryRoutes);
    app.use('/api/media', mediaRoutes);
    app.use('/api/diary/analyze', analyzeRoutes);

    app.get('/', (req, res) => {
      res.json({ status: 'ok' });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

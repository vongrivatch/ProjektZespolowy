const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

const flashcards = require('../flashcard-frontend/src/flashcardsData.json');

app.get('/api/flashcards', (req, res) => {
  res.json(flashcards);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

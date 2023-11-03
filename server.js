const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const flashcards = require('./flashcard-frontend/src/flashcardsData');

app.get('/api/flashcards', (req, res) => {
  res.json(flashcards);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

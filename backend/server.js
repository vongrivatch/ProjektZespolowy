const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Ustawienie ścieżki do statycznych plików zbudowanej aplikacji React
app.use(express.static(path.join(__dirname, 'build')));

// Importuj flashcardsData.json z jego lokalizacji w projekcie React
const flashcards = require('../flashcard-frontend/src/flashcardsData.json');

app.get('/api/flashcards', (req, res) => {
  res.json(flashcards);
});

// Obsługa każdej innej ścieżki przez serwowanie index.html z folderu build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

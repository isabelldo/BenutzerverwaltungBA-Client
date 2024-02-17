const express = require('express');
const path = require('path');

const app = express();

// Statische Dateien wie CSS, Bilder, JavaScript werden im 'public' Verzeichnis gespeichert
app.use(express.static(path.join(__dirname, 'public')));

// Startseite auf die login.html setzen
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

const port = 8080; // Port, auf dem der Server läuft
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});

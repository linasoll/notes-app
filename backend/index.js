const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 7070;

app.use(cors());
app.use(bodyParser.json());

let notes = [];

// Получение списка заметок
app.get('/notes', (req, res) => {
    res.json(notes);
});

// Добавление новой заметки
app.post('/notes', (req, res) => {
    const newNote = { id: notes.length + 1, content: req.body.content };
    notes.push(newNote);
    res.json(newNote);
});

// Удаление заметки
app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("DB Connection Error:", err));

const Note = mongoose.model('Note', { content: String, createdAt: { type: Date, default: Date.now } });

app.get('/health', (req, res) => res.status(200).json({ status: "ok" }));

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/api/notes', async (req, res) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
});

app.post('/api/notes', async (req, res) => {
    const newNote = new Note({ content: req.body.content });
    await newNote.save();
    res.json(newNote);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
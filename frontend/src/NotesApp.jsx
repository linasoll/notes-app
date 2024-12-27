import React, { useState, useEffect } from 'react';

function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        fetch('http://localhost:7070/notes')
            .then(response => response.json())
            .then(data => setNotes(data));
    }, []);

    const addNote = () => {
        fetch('http://localhost:7070/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newNote }),
        })
            .then(response => response.json())
            .then(note => {
                setNotes([...notes, note]);
                setNewNote('');
            });
    };

    const deleteNote = (id) => {
        fetch(`http://localhost:7070/notes/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            });
    };

    return (
        <div className="notes-app">
            <h1>Заметки</h1>
            <div className='form'>
            <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Введите заметку"
            />
            <button onClick={addNote}>Добавить заметку</button>
            </div>
            <ul className='notes'>
                {notes.map(note => (
                    <li className="note-item" key={note.id}>
                        <button className='button' onClick={() => deleteNote(note.id)}>X</button>
                        {note.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotesApp;
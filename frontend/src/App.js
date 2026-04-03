import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [about, setAbout] = useState(null);

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchNotes();
    fetchAbout();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get(`${API_URL}/api/notes`);
    setNotes(res.data);
  };

  const fetchAbout = async () => {
    const res = await axios.get(`${API_URL}/about`);
    setAbout(res.data);
  };

  const addNote = async () => {
    if (input.trim()) {
      await axios.post(`${API_URL}/api/notes`, { content: input });
      setInput('');
      fetchNotes();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Note App - DevOps Project</h1>
      <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '20px' }}>
        <h2>Trang /about</h2>
        {about && (
          <p>
            <b>Họ tên:</b> {about.fullName} <br/>
            <b>MSSV:</b> {about.studentID} <br/>
            <b>Lớp:</b> {about.class}
          </p>
        )}
      </div>

      <div>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Nhập ghi chú..." 
        />
        <button onClick={addNote}>Thêm Ghi Chú</button>
      </div>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
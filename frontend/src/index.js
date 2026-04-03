import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Chào mừng đến với Note App!</h1>
      <p>Backend Status: <a href="http://localhost:5000/health">Check Health</a></p>
      <p>About Me: <a href="http://localhost:5000/about">Check About</a></p>
    </div>
  </React.StrictMode>
);
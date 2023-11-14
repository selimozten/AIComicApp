import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [comic, setComic] = useState({ text: '', image: '' });

  const handleSendPrompt = async () => {
    try {
      const response = await fetch('http://localhost:8000/create-comic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, title }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setComic(result);
    } catch (error) {
      console.error("Failed to send the prompt: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Comic Book Generator</h1>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter comic title"
        />
        <textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Enter prompt for the comic"
        />
        <button onClick={handleSendPrompt}>Generate Comic</button>
        {comic.text && <div>
          <h3>{title}</h3>
          <p>{comic.text}</p>
          {/* Here you will also display the generated image */}
        </div>}
      </header>
    </div>
  );
}

export default App;

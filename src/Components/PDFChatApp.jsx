import React, { useState } from 'react';
import axios from 'axios';

function PDFChatApp() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setPdfFiles(event.target.files);
  };

  // Upload PDFs to the server
  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < pdfFiles.length; i++) {
      formData.append('pdf_files', pdfFiles[i]);
    }
    try {
      const response = await axios.post('http://localhost:5000/upload_pdfs', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error uploading PDFs:', error);
    }
  };

  // Ask a question to the bot
  const handleAskQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:5000/ask_question', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div>
      <h1>Chat with Your PDFs</h1>

      {/* PDF Upload */}
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDFs</button>

      {/* Ask Question */}
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question"
      />
      <button onClick={handleAskQuestion}>Ask</button>

      {/* Display Answer */}
      {answer && (
        <div>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default PDFChatApp;

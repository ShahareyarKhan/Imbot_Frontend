import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

const CreateBot = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [pdftext, setPdfText] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('File uploaded and processed:', result);
        alert('Bot created successfully');
        setPdfText(result.text);
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white p-6 gap-5">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">Create Your AI Bot</h1>
      <p className="text-gray-400 mb-6 text-center">
        Professionally train your bot using your resume, research papers, books, or any other PDFs!
      </p>

      <div
        className={`border-2 border-dashed border-gray-500 p-8 w-full max-w-lg text-center text-black rounded-lg bg-[#101236] relative ${dragActive ? 'bg-gray-200' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div>
            <p className="text-sm text-gray-400 font-medium">
              {file ? `File: ${file.name}` : 'Drag & Drop your PDF here'}
            </p>
            <p className="text-sm mt-4 text-gray-400 font-medium">
              or
            </p>
            <button
              style={{ transition: 'all 0.4s ease' }}
              className="mt-4 px-4 py-2 text-sm bg-[#05061c] text-white rounded hover:rounded-xl"
              onClick={() => document.getElementById('file-upload').click()}
            >
              Browse File
            </button>
          </div>
        </label>

        {dragActive && (
          <div
            className="absolute inset-0 bg-gray-300 opacity-50 rounded-lg"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </div>

      {file && (
        <>
          <div className="mt-4">
            <p className="text-green-600 text-xs">File selected: {file.name}</p>
          </div>

          <div className='flex justify-between max-w-lg w-full mx-auto'>

            <div>
              <button className='hover:rounded-xl my-8 px-5 md:px-9 p-3 text-sm create font-semibold bg-gradient-to-r text-black  from-indigo-500 via-purple-500 to-pink-500 ' >Summarize </button>
            </div>
            <div>
              <button className='hover:rounded-xl my-8 px-5 md:px-9 p-3 text-sm bg-gradient-to-r text-black font-bold from-indigo-500 via-purple-500 to-pink-500 create' onClick={handleSubmit}>Create</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateBot;

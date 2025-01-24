import React, { useContext, useEffect, useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import { AlertContext } from '../AlertContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
const CreateBot = () => {
  const navigate = useNavigate();
  const { alrtMsg, setAlrtMsg } = useContext(AlertContext);
  const { user } = useContext(UserContext);
  const [working, setworking] = useState(false);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [pdftext, setPdfText] = useState('');
  const [summarization, setSummarization] = useState('');
  const [summari, setSummari] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [botName, setBotName] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      setAlrtMsg('Please login to create a bot.');
      navigate('/');
    }
  }, []);
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

  useEffect(() => {
    if (file) {
      handleSubmit();
    }
  }, [file]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setworking(true);
      const response = await fetch('https://imbot-backend.vercel.app/api/pdf/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setworking(false);
        const result = await response.json();
        setPdfText(result.text);
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSummarize = async () => {
    setworking(true);
    if (!pdftext) return;

    let textToSummarize = pdftext;

    try {
      const response = await fetch('http://127.0.0.1:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToSummarize }), // Corrected the body key to 'text'
      });

      const result = await response.json();

      // Check if the response has the summary
      if (result && result.summary) {
        setSummari(true);
        setSummarization(result.summary); // Corrected access to 'summary' directly
      }

      console.log('Summarized text:', result.summary); // Corrected to use 'summary'

    } catch (error) {
      console.error('Error:', error);
    }

    setworking(false);
  };


  const handlebot = async () => {
    if (!pdftext || !botName) return;

    try {
      const response = await fetch('https://imbot-backend.vercel.app/api/pdf/store-in-db', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: pdftext, botName }),
      });
      const result = await response.json();
      console.log(result)
      setAlrtMsg('Bot generated successfully.');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating bot:', error);
      setAlrtMsg('Error creating bot. Please try again later.');
    }
  };

  return (
    <>
    <Header/>
    <div className='flex flex-col items-center justify-center min-h-[90vh] '>

      <h1 className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-center py-4 text-3xl md:text-4xl px-8'>Welcome, {user ? user.name : "User"}.</h1>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white border-b">Create Your AI Bot</h1>
      <p className="text-gray-500 text-sm mb-4 text-center px-8">
        Professionally train your bot using your resume, research papers, books, or any other PDFs!
      </p>


      <div className={`flex flex-col items-center w-[90%] mx-auto text-white p-6 gap-5 ${pdftext ? 'md:grid md:grid-cols-2' : 'md:flex md:justify-center'}`}>
        <div
          className={`border-2 border-dashed  border-gray-500 p-10 w-full max-w-[600px] text-center text-black rounded-lg max-h-[370px] overflow-auto md:max-h-[300px] bg-[#101236] relative ${dragActive ? 'bg-gray-200' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {working && <Box sx={{ width: '100%', marginBottom: '1rem' }}><LinearProgress /></Box>}
          <p className='text-sm text-gray-400 mb-2'>Enter Text here: </p>
          <textarea
            name="pdftext"
            id=""
            // value={pdftext}
            placeholder="Enter text here"
            className="w-[90%]  border  mx-auto bg-[#101236] resize-none outline-none border-gray-500 p-4 h-[50px]  rounded text-white text-sm overflow-y-auto"
            onChange={(e) => setPdfText(e.target.value)}
          ></textarea>

          <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept=".pdf" />

          <label htmlFor="file-upload" className="cursor-pointer">
            <div>
              <p className="text-sm text-gray-400 font-medium">
                {file ? `File Selected: ${file.name}` : ''}
              </p>
              {pdftext && (
                <div className="flex flex-col md:flex-row justify-between max-w-md mt-4 w-full mx-auto md:gap-6">
                  <button className="hover:rounded-xl my-4 px-5 w-full md:w-[60%] md:px-9 p-3 text-sm create font-semibold bg-gradient-to-r text-black from-indigo-500 via-purple-500 to-pink-500" onClick={handleSummarize}>
                    Summarize
                  </button>
                  <button className="hover:rounded-xl my-4 px-5 md:px-9 w-full md:w-[60%] p-3 text-sm bg-gradient-to-r text-black font-semibold from-indigo-500 create via-purple-500 to-pink-500" onClick={() => setShowModal(true)}>
                    Create Bot
                  </button>
                </div>
              )}
              <p className="text-sm mt-2 text-gray-400 font-medium">or</p>
              <button className="mt-4 px-4 py-3 text-sm w-[90%] bg-[#171a59]  hover:bg-[#202668] text-white rounded-lg hover:rounded-xl" onClick={() => document.getElementById('file-upload').click()}>
                Browse File
              </button>
            </div>
          </label>
          {dragActive && (
            <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-lg" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>
          )}
        </div>

        {/* Modal for entering bot name */}
        <Modal open={showModal} onClose={() => setShowModal(false)}>

          <Box className="modal-box absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[500px] rounded-lg bg-[#051322] w-[70%] p-10 mx-auto">
            <h2 className="text-xl font-bold text-indigo-500">Enter Bot Name</h2>


            <input type="text" name="" id="" value={botName} onChange={(e) => setBotName(e.target.value)} className='px-3 border-0.5 w-full p-2 border-[1px] my-3 rounded outline-none ' placeholder='Enter bot name' />
            <div className='flex justify-between'>

              <button className="bg-gradient-to-r text-black from-indigo-500 via-purple-500 to-pink-500 hover:rounded-xl px-5 py-3 text-sm create" onClick={() => {
                setShowModal(false);
              }}>
                Cancel
              </button>
              <button className="bg-gradient-to-r text-black from-indigo-500 via-purple-500 to-pink-500 hover:rounded-xl px-5 py-3 text-sm create" onClick={handlebot}>
                Create Bot
              </button>
            </div>
          </Box>
        </Modal>

        {summarization && (
          <div className="w-full h-full flex flex-col items-center justify-center rounded-lg max-h-[370px] relative bg-[#101236] text-sm text-gray-400 p-6 ">
            <h1 className='text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold  my-4 '>Summarized Text</h1>
            <div className='text-xs absolute top-0   p-4 text-white right-0 rounded cursor-pointer ' onClick={() => { navigator.clipboard.writeText(pdftext); setAlrtMsg("Pdf text copied to clipboard.") }}>
              <FaClipboard className='text-lg ' />
            </div>
            <p className="text-gray-300 mt-2">{summarization}</p>
          </div>
        )}

        {pdftext && <div className={`w-full  h-full overflow-auto max-h-[300px] flex flex-col items-center rounded-lg bg-[#101236] text-gray-400 p-6 text-sm relative ${summarization && pdftext ? 'md:col-span-2' : ''}`}>
          <h1 className='text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold  my-4 '>Pdf Text</h1>
          <div className='text-xs absolute top-0   p-4 text-white right-0 rounded cursor-pointer ' onClick={() => { navigator.clipboard.writeText(pdftext); setAlrtMsg("Pdf text copied to clipboard.") }}>
            <FaClipboard className='text-lg ' />
          </div>
          {pdftext}
        </div>}
      </div>
    </div>
    
    </>

  );
};

export default CreateBot;

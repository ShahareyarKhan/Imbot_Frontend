// import React, { useContext, useEffect, useState } from 'react';
// import { FaClipboard, FaFilePdf, FaYoutube } from 'react-icons/fa';
// import { AlertContext } from '../AlertContext';
// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';
// import Modal from '@mui/material/Modal';
// import { UserContext } from '../UserContext';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import { YoutubeTranscript } from 'youtube-transcript';
// import { IoText } from 'react-icons/io5';
// import { MdLink } from 'react-icons/md';

// const CreateBot = () => {
//   const navigate = useNavigate();
//   const { alrtMsg, setAlrtMsg } = useContext(AlertContext);
//   const { user } = useContext(UserContext);

//   const [working, setworking] = useState(false);
//   const [file, setFile] = useState(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [pdftext, setPdfText] = useState('');
//   const [webLink, setWebLink] = useState('');
//   const [youtubeLink, setYoutubeLink] = useState('');
//   const [plainText, setPlainText] = useState('');
//   const [summarization, setSummarization] = useState('');
//   const [summari, setSummari] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [botName, setBotName] = useState('');
//   const [inputType, setInputType] = useState({
//     pdf: false,
//     web: false,
//     youtube: false,
//     text: true
//   });

//   useEffect(() => {
//     if (localStorage.getItem('token') === null) {
//       setAlrtMsg('Please login to create a bot.');
//       navigate('/');
//     }
//   }, []);

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
//     else if (e.type === 'dragleave') setDragActive(false);
//   };


//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   useEffect(() => {
//     if (file) {
//       handleSubmit();
//     }
//   }, [file]);


//   useEffect(() => {
//     const getYoutubeVideoId = (url) => {
//       const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
//       const match = url.match(regExp);
//       return match && match[1] ? match[1] : null;
//     };

//     const videoId = getYoutubeVideoId(youtubeLink);
//     if (videoId) {
//       fetch('http://localhost:3000/api/youtube/get-transcript', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ videoId })
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (data.transcript) {
//             setPlainText(data.transcript);
//           } else {
//             setAlrtMsg('Transcript not found.');
//           }
//         })
//         .catch(err => {
//           console.error('Error fetching transcript:', err);
//           setAlrtMsg('Error fetching transcript. Please try again.');
//         });
//     }
//   }, [youtubeLink]);

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setworking(true);
//       const response = await fetch('https://imbot-backend.vercel.app/api/pdf/upload-pdf', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         setworking(false);
//         const result = await response.json();
//         setPdfText(result.text);
//       } else {
//         console.error('Error uploading file');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const getInputText = () => {
//     if (plainText.trim()) return plainText;
//     if (webLink.trim()) return webLink;
//     if (youtubeLink.trim()) return youtubeLink;
//     return pdftext;
//   };


//   const handlebot = async () => {
//     const inputText = getInputText();
//     if (!inputText || !botName) return;

//     try {
//       const response = await fetch('https://imbot-backend.vercel.app/api/pdf/store-in-db', {
//         method: 'POST',
//         headers: {
//           Authorization: localStorage.getItem('token'),
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: inputText, botName }),
//       });

//       const result = await response.json();
//       console.log(result);
//       setAlrtMsg('Bot generated successfully.');
//       setShowModal(false);
//     } catch (error) {
//       console.error('Error creating bot:', error);
//       setAlrtMsg('Error creating bot. Please try again later.');
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className='flex flex-col items-center justify-center min-h-[90vh]'>
//         <h1 className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-center py-4 text-3xl md:text-4xl px-8'>
//           Welcome, {user ? user.name : 'User'}.
//         </h1>
//         <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white border-b">Create Your AI Bot</h1>
//         <p className="text-gray-500 text-sm mb-4 text-center px-8">
//           Professionally train your bot using your resume, research papers, books, or any other PDFs!
//         </p>

//         <div className={`flex flex-col items-center w-[90%] mx-auto text-white p-6 gap-5 ${pdftext ? 'md:grid md:grid-cols-2' : 'md:flex md:justify-center'}`}>
//           <div
//             className={`border-2 border-dashed border-gray-500 p-10 w-full max-w-[600px] text-center text-black rounded-lg max-h-[400px] overflow-auto md:max-h-[300px] bg-[#101236] relative ${dragActive ? 'bg-gray-200' : ''}`}
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//           >
//             {working && <Box sx={{ width: '100%', marginBottom: '1rem' }}><LinearProgress /></Box>}

//             {/* Web Links */}
//             {inputType.web && (<div> <textarea
//               placeholder="Enter Website Link"
//               className="w-[90%] border mx-auto bg-[#101236] resize-none outline-none border-gray-500 p-4 h-[50px] rounded text-white text-sm overflow-y-auto"
//               value={webLink}
//               onChange={(e) => setWebLink(e.target.value)}
//             ></textarea>
//             </div>)}

//             {/* YouTube Links */}
//             {inputType.youtube && (<div>
//               <textarea
//                 placeholder="Enter YouTube Video Link"
//                 className="w-[90%] border mx-auto bg-[#101236] resize-none outline-none border-gray-500 p-4 h-[50px] rounded text-white text-sm overflow-y-auto"
//                 value={youtubeLink}
//                 onChange={(e) => setYoutubeLink(e.target.value)}
//               ></textarea>
//             </div>)}

//             {/* Plain Text */}
//             {inputType.text && (<div>
//               <textarea
//                 placeholder="Enter text here"
//                 className="w-[90%] border mx-auto bg-[#101236] resize-none outline-none border-gray-500 p-4 h-[50px] rounded text-white text-sm overflow-y-auto"
//                 value={plainText}
//                 onChange={(e) => setPlainText(e.target.value)}
//               ></textarea>
//             </div>)}

//             {/* PDF Upload */}
//             {inputType.pdf && (
//               <div>
//                 <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept=".pdf" />

//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <div>
//                     <p className="text-sm text-gray-400 font-medium">{file ? `File Selected: ${file.name}` : ''}</p>
//                     <button
//                       className="mt-4 px-4 py-3 text-sm w-[90%] bg-[#171a59] hover:bg-[#202668] text-white rounded-lg hover:rounded-xl"
//                       onClick={() => document.getElementById('file-upload').click()}
//                     >
//                       Browse File
//                     </button>
//                   </div>
//                 </label>
//               </div>
//             )}

//             {dragActive && (
//               <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-lg"
//                 onDragEnter={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDragOver={handleDrag}
//                 onDrop={handleDrop}></div>
//             )}

//             {getInputText() && (
//               <div className="flex flex-col md:flex-row justify-between max-w-md mt-4 w-full mx-auto md:gap-6">
//                 <button className="hover:rounded-xl my-4 px-5 md:px-9 w-full md:w-[60%] p-3 text-sm bg-gradient-to-r text-black font-semibold from-indigo-500 create via-purple-500 to-pink-500" onClick={() => setShowModal(true)}>
//                   Create Bot
//                 </button>
//               </div>
//             )}

//             <div className='flex gap-5  w-[90%] mx-auto  mt  p-4 px-0  rounded text-white text-2xl overflow-y-auto'>
//               <FaFilePdf className={`${inputType.pdf ? 'text-indigo-500' : ''} cursor-pointer`} title='PDF' onClick={() => setInputType({pdf: true, text: false, youtube: false, web: false})}/>
//               <IoText className={`${inputType.text ? 'text-indigo-500' : ''} cursor-pointer`} onClick={() => setInputType({pdf: false, text: true, youtube: false, web: false})} title='Text'/>
//               <FaYoutube className={`${inputType.youtube ? 'text-indigo-500' : ''} cursor-pointer`} onClick={() => setInputType({pdf: false, text: false, youtube: true, web: false})} title='Youtube'/>
//               <MdLink className={`${inputType.web ? 'text-indigo-500' : ''} cursor-pointer`} onClick={() => setInputType({pdf: false, text: false, youtube: false, web: true})} title='Website'/>
//             </div>
//           </div>

//           <Modal open={showModal} onClose={() => setShowModal(false)}>
//             <Box className="modal-box absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[500px] rounded-lg bg-[#051322] w-[70%] p-10 mx-auto">
//               <h2 className="text-xl font-bold text-indigo-500">Enter Bot Name</h2>
//               <input type="text" value={botName} onChange={(e) => setBotName(e.target.value)} className='px-3  w-full p-2 border-[1px] my-3 rounded outline-none' placeholder='Enter bot name' />
//               <div className='flex justify-between'>
//                 <button className="bg-gradient-to-r text-black from-indigo-500 via-purple-500 to-pink-500 hover:rounded-xl px-5 py-3 text-sm create" onClick={() => setShowModal(false)}>Cancel</button>
//                 <button className="bg-gradient-to-r text-black from-indigo-500 via-purple-500 to-pink-500 hover:rounded-xl px-5 py-3 text-sm create" onClick={handlebot}>Create Bot</button>
//               </div>
//             </Box>
//           </Modal>

//           {summarization && (
//             <div className="w-full h-full flex flex-col items-center justify-center rounded-lg max-h-[370px] relative bg-[#101236] text-sm text-gray-400 p-6">
//               <h1 className='text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold my-4'>Summarized Text</h1>
//               <div className='text-xs absolute top-0 p-4 text-white right-0 rounded cursor-pointer' onClick={() => { navigator.clipboard.writeText(summarization); setAlrtMsg("Summarized text copied to clipboard.") }}>
//                 <FaClipboard className='text-lg' />
//               </div>
//               <p className="text-gray-300 mt-2">{summarization}</p>
//             </div>
//           )}

//           {getInputText() && (
//             <div className={`w-full h-full overflow-auto max-h-[300px] flex flex-col items-center rounded-lg bg-[#101236] text-gray-400 p-6 text-sm relative ${summarization ? 'md:col-span-2' : ''}`}>
//               <h1 className='text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold my-4'>Input Text</h1>
//               <div className='text-xs absolute top-0 p-4 text-white right-0 rounded cursor-pointer' onClick={() => { navigator.clipboard.writeText(getInputText()); setAlrtMsg("Input text copied to clipboard.") }}>
//                 <FaClipboard className='text-lg' />
//               </div>
//               {getInputText()}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateBot;


import React, { useContext, useEffect, useState } from 'react';
import { FaClipboard, FaFilePdf, FaYoutube } from 'react-icons/fa';
import { AlertContext } from '../AlertContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { IoText } from 'react-icons/io5';
import { MdLink } from 'react-icons/md';

const CreateBot = () => {
  const navigate = useNavigate();
  const { alrtMsg, setAlrtMsg } = useContext(AlertContext);
  const { user } = useContext(UserContext);

  const [working, setworking] = useState(false);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [pdftext, setPdfText] = useState('');
  const [webLink, setWebLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [plainText, setPlainText] = useState('');
  const [summarization, setSummarization] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [botName, setBotName] = useState('');
  const [inputType, setInputType] = useState({
    pdf: false,
    web: false,
    youtube: false,
    text: true
  });

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      setAlrtMsg('Please login to create a bot.');
      navigate('/');
    }
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
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

  useEffect(() => {
    const getYoutubeVideoId = (url) => {
      const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
      const match = url.match(regExp);
      return match && match[1] ? match[1] : null;
    };

    const videoId = getYoutubeVideoId(youtubeLink);
    if (videoId) {
      fetch('http://localhost:3000/api/youtube/get-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId })
      })
        .then(res => res.json())
        .then(data => {
          if (data.transcript) {
            setPlainText(data.transcript);
          } else {
            setAlrtMsg('Transcript not found.');
          }
        })
        .catch(err => {
          console.error('Error fetching transcript:', err);
          setAlrtMsg('Error fetching transcript. Please try again.');
        });
    }
  }, [youtubeLink]);

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

  const getInputText = () => {
    if (plainText.trim()) return plainText;
    if (youtubeLink.trim()) return youtubeLink;
    return pdftext;
  };

  const handlebot = async () => {
    if (!botName) {
      setAlrtMsg('Bot name is required.');
      return;
    }

    try {
      let inputText = '';

      if (inputType.web) {
        const res = await fetch('http://localhost:3000/api/web/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: webLink }),
        });

        const data = await res.json();
        inputText = data.text;

        if (!inputText) {
          setAlrtMsg('Could not extract content from web link.');
          return;
        }
      } else {
        inputText = getInputText();
      }

      const response = await fetch('https://imbot-backend.vercel.app/api/pdf/store-in-db', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText, botName }),
      });

      const result = await response.json();
      console.log(result);
      setAlrtMsg('Bot generated successfully.');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating bot:', error);
      setAlrtMsg('Error creating bot. Please try again later.');
    }
  };

  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-[90vh]'>
        <h1 className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-center py-4 text-3xl md:text-4xl px-8'>
          Welcome, {user ? user.name : 'User'}.
        </h1>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white border-b">Create Your AI Bot</h1>
        <p className="text-gray-500 text-sm mb-4 text-center px-8">
          Professionally train your bot using your resume, research papers, books, or any other PDFs!
        </p>

        <div className={`flex flex-col items-center w-[90%] mx-auto text-white p-6 gap-5 ${pdftext ? 'md:grid md:grid-cols-2' : 'md:flex md:justify-center'}`}>
          <div
            className={`border-2 border-dashed border-gray-500 p-10 w-full max-w-[600px] text-center text-black rounded-lg max-h-[400px] overflow-auto md:max-h-[300px] bg-[#101236] relative ${dragActive ? 'bg-gray-200' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {working && <Box sx={{ width: '100%', marginBottom: '1rem' }}><LinearProgress /></Box>}

            {inputType.web && (
              <textarea
                placeholder="Enter Website Link"
                className="w-[90%] border mx-auto bg-[#101236] resize-none outline-none border-gray-500 p-4 h-[50px] rounded text-white text-sm overflow-y-auto"
                value={webLink}
                onChange={(e) => setWebLink(e.target.value)}
              ></textarea>
            )}

            {inputType.youtube && (
              <textarea
                placeholder="Enter YouTube Video Link"
                className="w-[90%] border mx-auto bg-[#101236] resize-none outline-none border-gray-500 p-4 h-[50px] rounded text-white text-sm overflow-y-auto"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
              ></textarea>
            )}

            {inputType.text && (
              <textarea
                placeholder="Enter text here"
                className="w-[90%] border mx-auto bg-[#101236] resize-none outline-none border-gray-500 p-4 h-[50px] rounded text-white text-sm overflow-y-auto"
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
              ></textarea>
            )}

            {inputType.pdf && (
              <div>
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept=".pdf" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <p className="text-sm text-gray-400 font-medium">{file ? `File Selected: ${file.name}` : ''}</p>
                  <button className="mt-4 px-4 py-3 text-sm w-[90%] bg-[#171a59] hover:bg-[#202668] text-white rounded-lg hover:rounded-xl">
                    Browse File
                  </button>
                </label>
              </div>
            )}

            {dragActive && (
              <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-lg"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}></div>
            )}

            <div className="flex gap-5 w-[90%] mx-auto mt-4 p-4 px-0 rounded text-white text-xl overflow-y-auto">
              <FaFilePdf className={`${inputType.pdf ? 'text-indigo-500' : ''} cursor-pointer`} onClick={() => setInputType({ pdf: true, text: false, youtube: false, web: false })} />
              <IoText className={`${inputType.text ? 'text-indigo-500' : ''} cursor-pointer`} onClick={() => setInputType({ pdf: false, text: true, youtube: false, web: false })} />
              <FaYoutube className={`${inputType.youtube ? 'text-indigo-500' : ''} cursor-pointer`} onClick={() => setInputType({ pdf: false, text: false, youtube: true, web: false })} />
              <MdLink className={`${inputType.web ? 'text-indigo-500' : ''} cursor-pointer`} onClick={() => setInputType({ pdf: false, text: false, youtube: false, web: true })} />
            </div>

            <button
              className="hover:rounded-xl mt-6 px-5 w-[90%] p-3 text-sm bg-gradient-to-r text-black font-semibold from-indigo-500 via-purple-500 to-pink-500"
              onClick={() => setShowModal(true)}
            >
              Create Bot
            </button>
          </div>

          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <Box className="modal-box absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[500px] rounded-lg bg-[#051322] w-[70%] p-10 mx-auto">
              <h2 className="text-xl font-bold text-indigo-500">Enter Bot Name</h2>
              <input type="text" value={botName} onChange={(e) => setBotName(e.target.value)} className='px-3 w-full p-2 border-[1px] my-3 rounded outline-none' placeholder='Enter bot name' />
              <div className='flex justify-between'>
                <button className="bg-gradient-to-r text-black from-indigo-500 via-purple-500 to-pink-500 hover:rounded-xl px-5 py-3 text-sm create" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="bg-gradient-to-r text-black from-indigo-500 via-purple-500 to-pink-500 hover:rounded-xl px-5 py-3 text-sm create" onClick={handlebot}>Create Bot</button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CreateBot;

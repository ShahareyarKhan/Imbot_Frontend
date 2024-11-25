// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaArrowLeft, FaRobot } from 'react-icons/fa';
// import { IoSend } from "react-icons/io5";
// import { BsVolumeUp } from "react-icons/bs"; // Import icon for the Read Aloud feature
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI("AIzaSyAPMXpo85GlPN-gAcmqkidHH74iZFBN5v4");

// const BotDetail = () => {
//     const { botId } = useParams();
//     const [bot, setBot] = useState(null);
//     const [question, setQuestion] = useState('');
//     const [chatHistory, setChatHistory] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [trained, setTrained] = useState(true);
//     const [user, setUser] = useState(null);
//     const currUserId = window.location.href.split("/")[4];

//     useEffect(() => {
//         const findUser = async () => {
//             try {
//                 const response = await fetch(`https://imbot-backend.vercel.app/api/auth/find-user/${currUserId}`);
//                 if (!response.ok) throw new Error("User not found");
//                 const data = await response.json();
//                 setUser(data);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };
//         findUser();
//     }, [currUserId]);

//     useEffect(() => {
//         if (user && user.bots) {
//             const findBot = user.bots.find((b) => b._id === botId);
//             setBot(findBot || null);
//         }
//     }, [botId, user]);

//     const handleQuestionSubmit = async () => {
//         if (!question || !bot || !bot.botText || !trained) return;

//         const userMessage = { text: question, sender: 'user' };
//         setChatHistory((prev) => [...prev, userMessage]);
//         setQuestion('');
//         setLoading(true);

//         try {
//             const prompt = `Using the following information: "${bot.botText}", please answer the question: "${question}"`;

//             const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//             const result = await model.generateContent(prompt);
//             const content = await result.response.text();

//             const botMessage = {
//                 text: content || "No response from bot.",
//                 sender: 'bot',
//             };
//             setChatHistory((prev) => [...prev, botMessage]);
//         } catch (error) {
//             console.error('Error:', error);
//             setChatHistory((prev) => [...prev, { text: "An error occurred while fetching the answer.", sender: 'bot' }]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const readAloud = (text) => {
//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.lang = 'en-US'; // Set language
//         window.speechSynthesis.speak(utterance);
//     };

//     if (!bot) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//             </div>
//         );
//     }

//     return (
//         <div className=" flex items-center justify-between min-h-[90vh]">
//             <div className="min-h-[80vh] max-w-[500px] w-[90%] mx-auto shadow-lg overflow-hidden  relative rounded-xl shadow-gray-800">
//                 <nav className="p-4 px-5 flex items-center justify-between gap-4 bg-[#071d5e] text-white">
//                     <div className="flex items-center gap-4">
//                         <FaArrowLeft className="cursor-pointer" onClick={() => window.history.back()} />
//                         <FaRobot className="text-3xl" />
//                         <h1 className="text-xl font-semibold">{bot.botName || "Loading..."}</h1>
//                     </div>
//                     {loading && (
//                         <div className="flex items-center gap-2">
//                             <span className="text-sm text-gray-400">Typing...</span>
//                         </div>
//                     )}
//                 </nav>

//                 <div className="flex flex-col  overflow-y-auto p-4 pb-16">
//                     {chatHistory.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`mb-2 min-w-[45px] p-2 relative text-white text-sm ${
//                                 msg.sender === 'user'
//                                     ? 'bg-[#281585] self-end rounded-tl-xl rounded-bl-2xl rounded-tr-lg'
//                                     : 'bg-[#234] self-start rounded-tr-xl rounded-br-2xl rounded-tl-lg'
//                             } max-w-[70%] flex items-center gap-2`}
//                         >
//                             <p className="text-sm">{msg.text}</p>
//                             <div
//                                 onClick={() => readAloud(msg.text)}
//                                 className="text-red-400 flex hover:text-gray-300 cursor-pointer"
//                                 title="Read"
//                             >
//                                 <BsVolumeUp />
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="flex absolute bottom-0 w-full items-center p-1 bg-white border-t border-gray-300 rounded-b-xl">
//                     <input
//                         type="text"
//                         value={question}
//                         onChange={(e) => setQuestion(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
//                         placeholder={trained ? "Type a message" : "Training bot, please wait..."}
//                         className="flex-grow bg-gray-100 outline-none px-3 py-2 text-black rounded-full mr-2"
//                         disabled={loading || !trained}
//                     />
//                     <button
//                         onClick={handleQuestionSubmit}
//                         className="text-[#075e54] bg-white text-2xl p-1"
//                         disabled={loading || !trained}
//                     >
//                         <IoSend />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BotDetail;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaRobot, FaMicrophone } from 'react-icons/fa'; // Import microphone icon
import { IoSend } from "react-icons/io5";
import { BsVolumeUp } from "react-icons/bs";
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyAPMXpo85GlPN-gAcmqkidHH74iZFBN5v4");

const BotDetail = () => {
    const { botId } = useParams();
    const [bot, setBot] = useState(null);
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trained, setTrained] = useState(true);
    const [user, setUser] = useState(null);
    const [listening, setListening] = useState(false); // State for listening status
    const currUserId = window.location.href.split("/")[4];

    useEffect(() => {
        const findUser = async () => {
            try {
                const response = await fetch(`https://imbot-backend.vercel.app/api/auth/find-user/${currUserId}`);
                if (!response.ok) throw new Error("User not found");
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        findUser();
    }, [currUserId]);

    useEffect(() => {
        if (user && user.bots) {
            const findBot = user.bots.find((b) => b._id === botId);
            setBot(findBot || null);
        }
    }, [botId, user]);

    const handleQuestionSubmit = async () => {
        if (!question || !bot || !bot.botText || !trained) return;

        const userMessage = { text: question, sender: 'user' };
        setChatHistory((prev) => [...prev, userMessage]);
        setQuestion('');
        setLoading(true);

        try {
            const prompt = `Using the following information: "${bot.botText}", please answer the question: "${question}"`;

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const content = await result.response.text();

            const botMessage = {
                text: content || "No response from bot.",
                sender: 'bot',
            };
            setChatHistory((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            setChatHistory((prev) => [...prev, { text: "An error occurred while fetching the answer.", sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };

    const readAloud = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set language
        window.speechSynthesis.speak(utterance);
    };

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Your browser does not support Speech Recognition.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setQuestion(transcript);
            setListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();
    };

    if (!bot) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className=" flex items-center justify-between min-h-[85vh]">
            <div className="min-h-[80vh] max-w-[500px] w-[90%] mx-auto shadow-lg overflow-hidden  relative rounded-xl shadow-gray-800">
                <nav className="p-4 px-5 flex items-center justify-between gap-4 bg-[#071d5e] text-white">
                    <div className="flex items-center gap-4">
                        <FaArrowLeft className="cursor-pointer" onClick={() => window.history.back()} />
                        <FaRobot className="text-3xl" />
                        <h1 className="text-xl font-semibold">{bot.botName || "Loading..."}</h1>
                    </div>
                    {loading && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Typing...</span>
                        </div>
                    )}
                </nav>

                <div className="flex flex-col  overflow-y-auto p-4 pb-16 max-h-[70vh]">
                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-2 min-w-[45px] p-2 relative text-white text-sm ${
                                msg.sender === 'user'
                                    ? 'bg-[#281585] self-end rounded-tl-xl rounded-bl-2xl rounded-tr-lg'
                                    : 'bg-[#234] self-start rounded-tr-xl rounded-br-2xl rounded-tl-lg'
                            } max-w-[70%] flex items-center gap-2`}
                        >
                            <p className="text-sm">{msg.text}</p>
                            <div
                                onClick={() => readAloud(msg.text)}
                                className="text-red-400 flex hover:text-gray-300 cursor-pointer"
                                title="Read"
                            >
                                <BsVolumeUp />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex absolute bottom-0 w-full items-center p-1 bg-white border-t border-gray-300 rounded-b-xl">
                    <div
                        onClick={startListening}
                        className={` text-xl h-full  md:text-2xl px-2 rounded-full ${listening ? 'text-red-600' : 'text-[#075e54] '}`}
                        disabled={listening}
                        title="Voice Input"
                    >
                        <FaMicrophone />
                    </div>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                        placeholder={trained ? "Type or speak a message" : "Training bot, please wait..."}
                        className="flex-grow bg-white outline-none px-2 py-2 text-black rounded-full mx-2"
                        disabled={loading || !trained}
                    />
                    <button
                        onClick={handleQuestionSubmit}
                        className="text-[#075e54] bg-white text-xl md:text-2xl p-1"
                        disabled={loading || !trained}
                    >
                        <IoSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BotDetail;

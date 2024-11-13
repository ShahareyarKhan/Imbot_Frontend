// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaRobot } from 'react-icons/fa';
// import { IoSend } from "react-icons/io5";
// import Header from './Header';

// const BotDetail = () => {
//     const HUGGING_FACE_API_KEY = "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"; // Replace with your actual Hugging Face API key
//     const { botId } = useParams();
//     const [bot, setBot] = useState(null);
//     const [question, setQuestion] = useState('');
//     const [chatHistory, setChatHistory] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [trained, setTrained] = useState(true);
//     const [user, setUser] = useState(null);
//     const currUserId = window.location.href.split("/")[4];

//     // Fetch user data on component mount
//     useEffect(() => {
//         const findUser = async () => {
//             try {
//                 const response = await fetch(`https://imbot-backend.vercel.app/api/auth/find-user/${currUserId}`);
//                 if (!response.ok) {
//                     throw new Error("User not found");
//                 }
//                 const data = await response.json();
//                 setUser(data);
//                 console.log(data); // Handle the user data as needed
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         findUser(); // Call the function to fetch user data
//     }, [currUserId]); // Only run once when the component mounts

//     // Find the bot for the current botId
//     useEffect(() => {
//         if (user && user.bots) {
//             const findBot = user.bots.find((b) => b._id === botId);
//             setBot(findBot);
//         }
//     }, [botId, user]); // Re-run when user or botId changes

//     const handleQuestionSubmit = async () => {
//         if (!question || !bot || !bot.botText || !trained) return;

//         const userMessage = { text: question, sender: 'user' };
//         setChatHistory((prev) => [...prev, userMessage]);
//         setQuestion('');
//         setLoading(true);

//         try {
//             // Call Hugging Face's API for summarization
//             const response = await fetch('https://api-inference.huggingface.co/models/distilbert/distilbert-base-cased-distilled-squad', {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     inputs: {
//                         question,
//                         context: bot.botText,
//                     }
//                 })
//             });

//             const result = await response.json();

//             if (result && result.answer) {
//                 const botMessage = {
//                     text: result.answer,
//                     sender: 'bot'
//                 };
//                 setChatHistory((prev) => [...prev, botMessage]);
//             } else {
//                 setChatHistory((prev) => [...prev, { text: "No response from bot.", sender: 'bot' }]);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setChatHistory((prev) => [...prev, { text: "An error occurred while fetching the answer.", sender: 'bot' }]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <div className='flex justify-between'>
//                 <div className='h-[90vh] max-w-[500px] w-[90%] mx-auto shadow-lg overflow-hidden'>
//                     <nav className='p-4 px-5 flex items-center gap-4 bg-[#071d5e] text-white'>
//                         <FaRobot className='text-3xl' />
//                         <h1 className='text-xl font-bold'>{bot ? bot.botName : "Loading..."} Bot</h1>
//                     </nav>

//                     <div className="flex flex-col p-4 overflow-y-auto h-[calc(100%-140px)] bg-[#000000]">
//                         {chatHistory.map((msg, index) => (
//                             <div key={index} className={`mb-2 p-2 text-white font-semibold text-sm ${msg.sender === 'user' ? 'bg-[#281585] self-end rounded-l-lg rounded-t-lg' : 'bg-[#234] self-start rounded-r-lg rounded-t-lg'} max-w-[70%]`}>
//                                 <p className="text-sm">{msg.text}</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Input Section */}
//                     <div className="flex items-center p-1 bg-white border-t border-gray-300">
//                         <input
//                             type="text"
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                             onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
//                             placeholder={trained ? "Type a message" : "Training bot, please wait..."}
//                             className="flex-grow bg-gray-100 outline-none px-3 py-2 text-black rounded-full mr-2"
//                             disabled={loading || !trained}
//                         />
//                         <button
//                             onClick={handleQuestionSubmit}
//                             className="text-[#075e54] bg-white text-2xl p-1"
//                             disabled={loading || !trained}
//                         >
//                             <IoSend />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default BotDetail;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import { IoSend } from "react-icons/io5";
import Header from './Header';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyAPMXpo85GlPN-gAcmqkidHH74iZFBN5v4"); // Replace with your actual Google Generative AI key

const BotDetail = () => {
    const { botId } = useParams();
    const [bot, setBot] = useState(null);
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trained, setTrained] = useState(true);
    const [user, setUser] = useState(null);
    const currUserId = window.location.href.split("/")[4];

    useEffect(() => {
        const findUser = async () => {
            try {
                const response = await fetch(`https://imbot-backend.vercel.app/api/auth/find-user/${currUserId}`);
                if (!response.ok) throw new Error("User not found");
                const data = await response.json();
                setUser(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        findUser();
    }, [currUserId]);

    useEffect(() => {
        if (user && user.bots) {
            const findBot = user.bots.find((b) => b._id === botId);
            setBot(findBot);
        }
    }, [botId, user]);

    const handleQuestionSubmit = async () => {
        if (!question || !bot || !bot.botText || !trained) return;
    
        const userMessage = { text: question, sender: 'user' };
        setChatHistory((prev) => [...prev, userMessage]);
        setQuestion('');
        setLoading(true);
    
        try {
            // Include both question and botText in the prompt to focus the response
            const prompt = `Using the following information: "${bot.botText}", please answer the question: "${question}"`;
    
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const content = await result.response.text();
    
            const botMessage = {
                text: content || "No response from bot.",
                sender: 'bot'
            };
            setChatHistory((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            setChatHistory((prev) => [...prev, { text: "An error occurred while fetching the answer.", sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='flex justify-between'>
            <div className='h-[90vh] max-w-[500px] w-[90%] mx-auto shadow-lg overflow-hidden'>
                <nav className='p-4 px-5 flex items-center gap-4 bg-[#071d5e] text-white'>
                    <FaRobot className='text-3xl' />
                    <h1 className='text-xl font-bold'>{bot ? bot.botName : "Loading..."} Bot</h1>
                </nav>

                <div className="flex flex-col p-4 overflow-y-auto h-[calc(100%-140px)] bg-[#000000]">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`mb-2 p-2 text-white font-semibold text-sm ${msg.sender === 'user' ? 'bg-[#281585] self-end rounded-l-lg rounded-t-lg' : 'bg-[#234] self-start rounded-r-lg rounded-t-lg'} max-w-[70%]`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center p-1 bg-white border-t border-gray-300">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                        placeholder={trained ? "Type a message" : "Training bot, please wait..."}
                        className="flex-grow bg-gray-100 outline-none px-3 py-2 text-black rounded-full mr-2"
                        disabled={loading || !trained}
                    />
                    <button
                        onClick={handleQuestionSubmit}
                        className="text-[#075e54] bg-white text-2xl p-1"
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

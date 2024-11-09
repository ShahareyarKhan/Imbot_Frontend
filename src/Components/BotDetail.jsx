import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { FaRobot } from 'react-icons/fa';
import { IoSend } from "react-icons/io5";

const BotDetail = () => {
    const { user } = useContext(UserContext);
    const { botId } = useParams();
    const [bot, setBot] = useState(null);
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trained, setTrained] = useState(false);

    const apiUrl = "http://127.0.0.1:5000"; // Local API endpoint

    useEffect(() => {
        const findBot = user?.bots?.find((b) => b._id === botId);
        setBot(findBot);
    }, [botId, user]);

    const trainChatbot = async () => {
        if (!bot || !bot.botText) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/train`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: bot.botText }),
            });
            const data = await res.json();
            alert(data.message);
            setTrained(true); // Mark as trained after successful training
        } catch (error) {
            console.error("Error training chatbot:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bot) trainChatbot(); // Train the bot on initial load if bot is available
    }, [bot]);

    const handleQuestionSubmit = async () => {
        if (!question || !bot || !bot.botText || !trained) return;
    
        const userMessage = { text: question, sender: 'user' };
        setChatHistory((prev) => [...prev, userMessage]);
        setQuestion('');
    
        setLoading(true);
        try {
            // Call the OpenAI API directly (not recommended for production)
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer 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`  // Replace with env variable in production
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: bot.botText },  // Use bot's trained data as context
                        { role: "user", content: question }
                    ],
                    max_tokens: 100,
                    temperature: 0.5
                })
            });
    
            if (response.status === 429) {
                alert("Too many requests. Please try again later.");
                return;
            }

            const result = await response.json();
            // Check if the result is valid before accessing the choices array
            if (result && result.choices && result.choices.length > 0) {
                const botMessage = {
                    text: result.choices[0].message.content,
                    sender: 'bot'
                };
                setChatHistory((prev) => [...prev, botMessage]);
            } else {
                setChatHistory((prev) => [...prev, { text: "No response from bot.", sender: 'bot' }]);
            }
        } catch (error) {
            console.error('Error:', error);
            setChatHistory((prev) => [...prev, { text: "An error occurred while fetching the answer.", sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className='flex justify-between '>
            <div className='h-[90vh] max-w-[500px] w-[90%] mx-auto shadow-lg overflow-hidden'>
                <nav className='p-4 px-5 flex items-center gap-4 bg-[#071d5e] text-white'>
                    <FaRobot className='text-3xl'/>
                    <h1 className='text-xl font-bold'>{bot ? bot.botName : "Loading..."} Bot</h1>
                </nav>
                
                <div className="flex flex-col p-4 overflow-y-auto h-[calc(100%-140px)] bg-[#000000]">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`mb-2 p-2 text-white font-semibold text-sm ${msg.sender === 'user' ? 'bg-[#135f68] self-end rounded-l-lg rounded-t-lg' : 'bg-[#234] self-start rounded-r-lg rounded-t-lg'} max-w-[70%]`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    ))}
                </div>

                {/* Input Section */}
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

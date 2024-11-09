import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const MyBot = () => {
    const { user } = useContext(UserContext);
    const history = useNavigate();

    const handleBotClick = (botId) => {
        history(`/bot/${botId}`);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-[70vh] py-8 px-4'>
            <h2 className='text-3xl font-bold text-white text-center '>
                Welcome, {user && user.name}!
            </h2>

            <p className='my-8 text-gray-500'>Here are your bots:</p>

            <div className='flex flex-col justify-center items-center max-w-lg gap-6 w-full place-content-center place-items-center'>
                {user && user.bots && user.bots.map((bot, index) => (
                    <div
                        key={index}
                        onClick={() => handleBotClick(bot._id)}
                        className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex justify-between items-center create w-full p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:p-5' style={{ transition: 'all 0.4s ease' }}
                    >
                        <div className='flex flex-col justify-center'>
                            <h3 className='text-xl font-semibold text-black  '>{bot.botName}</h3>
                            <p className='text-gray-600   text-sm'>
                                {bot.botText.slice(0, 40)}...
                            </p>
                        </div>
                        <button className='  px-4 text-sm py-2 bg-[#0a243d] text-white rounded-lg hover:bg-black transition '>
                            Chat
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBot;

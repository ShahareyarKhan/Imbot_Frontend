import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { AlertContext } from '../AlertContext';
import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaShare } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const MyBot = () => {
    const { user } = useContext(UserContext);
    const { alrtMsg, setAlrtMsg } = useContext(AlertContext);
    const history = useNavigate();
    const [showShareOptions, setShowShareOptions] = useState(null); // Store the botId for share options
    const [selectedBotId, setSelectedBotId] = useState(null); // Store the selected botId

    const handleBotClick = (botId) => {
        history(`/bot/${user._id}/${botId}`);
    };

    const handleShareClick = (botId) => {
        setSelectedBotId(botId); // Update the selectedBotId when the share button is clicked
        setShowShareOptions(true); // Show the share options
    };

    const handleShareOption = (botId, platform) => {
        const botLink = `${window.location.origin}/bot/${user._id}/${botId}`;
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(botLink)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=Check out my bot&body=${encodeURIComponent(botLink)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(botLink)}`;
                break;
            case 'instagram':
                alert('Instagram does not support direct link sharing like this. Please share the link manually.');
                return;
            default:
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            setAlrtMsg('Please Login First!');
            history('/login');
        }
    }, []);

    return (
        <div className='flex flex-col items-center justify-center min-h-[70vh]  overflow-auto py-8 px-4 '>
            <h2 className='text-3xl font-bold text-white text-center'>
                Welcome, {user && user.name}!
            </h2>

            <p className='my-8 text-gray-500'>Here are your bots:</p>

            <div className='flex flex-col justify-center items-center max-w-lg gap-6 w-full place-content-center place-items-center'>
                {user && user.bots && user.bots.map((bot, index) => (
                    <div
                        key={index}
                        className='bg-[#ffffff] flex justify-between items-center w-full p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform'
                        style={{ transition: 'all 0.4s ease' }}
                    >
                        <div className='flex flex-col justify-center'>
                            <h3 className='text-xl font-semibold text-black'>{bot.botName}</h3>
                            <p className='text-gray-600 text-sm'>
                                {bot.botText.slice(0, 40)}...
                            </p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <button
                                className='px-4 text-sm py-2 bg-[#0a243d] text-white rounded-lg hover:bg-black transition'
                                onClick={() => handleBotClick(bot._id)}
                            >
                                Chat
                            </button>

                            <div
                                className='px-4 text-sm py-2 text-black rounded-lg  transition'
                                onClick={() => handleShareClick(bot._id)}
                            >
                                <FaShare />
                            </div>
                        </div>
                    </div>
                ))}
                {showShareOptions && selectedBotId && (
                    <div className="fixed bg-[#040404] top-1/2  shadow-lg rounded-lg p-7 mt-2 flex  gap-5">
                        <div className="absolute top-3 right-3">
                            <IoClose className='text-2xl text-white' onClick={() => {
                                setShowShareOptions(false); // Close share options
                            }} />
                        </div>
                        <div onClick={() => handleShareOption(selectedBotId, 'whatsapp')} className="flex items-center flex-col text-green-500 cursor-pointer">
                            <FaWhatsapp className="mr-2 text-2xl" /> WhatsApp
                        </div>
                        <div onClick={() => handleShareOption(selectedBotId, 'email')} className="flex items-center flex-col text-blue-500 cursor-pointer">
                            <FaEnvelope className="mr-2 text-2xl" /> Email
                        </div>
                        <div onClick={() => handleShareOption(selectedBotId, 'facebook')} className="flex items-center flex-col text-blue-600 cursor-pointer">
                            <FaFacebook className="mr-2 text-2xl" /> Facebook
                        </div>
                        <div onClick={() => handleShareOption(selectedBotId, 'instagram')} className="flex items-center text-pink-500 cursor-pointer flex-col">
                            <FaInstagram className="mr-2 text-2xl" /> Instagram
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBot;

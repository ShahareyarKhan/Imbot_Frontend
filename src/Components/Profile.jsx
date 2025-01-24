
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';

const Profile = () => {
    const { userId } = useParams(); // Get the userId from the URL params
    const [user, setUser] = useState(null); // Initial state for user data
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // For error handling

    const history = useNavigate();
    const handleBotClick = (botId) => {
        history(`/bot/${botId}`);
    };

    // Function to fetch user data based on userId
    const FindUser = async () => {
        try {
            const response = await fetch(`https://imbot-backend.vercel.app/api/auth/find-user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUser(data); // Set user data
            setLoading(false); // Update loading state
        } catch (error) {
            setError(error.message); // Handle error
            setLoading(false); // Update loading state
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/'; // Redirect to home if token is not found
        } else {
            FindUser(); // Fetch user data on component mount
        }
    }, [userId]); // Re-fetch if userId changes

    if (loading) {
        return <div className='text-center my-8'>Loading...</div>; // Show loading state while fetching
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if fetch fails
    }

    return (
        <>
        <Header/>
        <div className='min-h-[90vh] flex flex-col w-full mx-auto justify-center'>
            <div className='bg-white w-[90%] mx-auto rounded-lg p-6 max-w-[500px]  flex flex-col justify-center gap-2 py-10 '>
                <p className='font-bold text-3xl text-center md:text-3xl text-black'>Profile</p>
                <h1 className='text-sm mb-0 text-black '>
                    {user ? `Id: ${user._id}` : "Id: Unknown"}
                </h1>
                <h1 className='text-xl mt-0 text-black md:text-2xl font-bold'>
                    {user ? `Name: ${user.name}` : "Name: Unknown"}
                </h1>
                <h1 className='text-black text-lg'>
                    {user ? `Email: ${user.email}` : "Email: Unknown"}
                </h1>
                <div className='font-semibold text-black'>
                    Total bots created: {user ? user.bots.length : 0}
                </div>

                <div className=''>
                    <p className='font-semibold text-black'>All Bots:</p>
                    <div className='grid grid-cols-2 gap-1 my-2'>
                        {user && user.bots.length > 0 ? (
                            user.bots.map((bot, index) => (
                                <div key={index} className='text-black border border-black p-3 cursor-pointer  text-center hover:rounded-xl' style={{ transition: 'all 0.4s ease' }}>
                                    {bot.botName} 
                                </div>
                            ))
                        ) : (
                            <li>No bots created</li> // Fallback if no bots
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>

    );
};

export default Profile;

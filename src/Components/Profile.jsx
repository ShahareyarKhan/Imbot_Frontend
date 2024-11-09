import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const Profile = () => {
    const {user} = useContext(UserContext);
    return (
        <div className='min-h-[90vh] flex flex-col max-w-lg mx-auto justify-center'>
            <p className='text-gray-500'></p>
            <h1 className='text-3xl md:text-4xl font-bold'>{user ? user.name : "loading..."}</h1>
            <h1 className=' md:text-xl font-thin my-3'>{user && user.email}</h1>
            
            <div className='font-semibold'>Total bots created: {user && user.bots.length}</div>
            <div className='my-4 rounded'>
                <button className='float-right text-xs rounded '>Add Bio</button>
                <div className='bg-[#234] rounded p-4 w-full '>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, esse?
                </div>
            </div>
            <div className='my-4 rounded'>
                <button className='float-right text-xs rounded '>Add Proffession</button>
                <div className='bg-[#234] rounded p-4 w-full '>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, esse?
                </div>
            </div>

            <button className='bg-gray-400 text-black hover:bg-white font-semibold'><a href="/" className=''>Home</a></button>
        </div>
    )
}

export default Profile

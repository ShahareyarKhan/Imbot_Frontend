import React, { useContext, useEffect } from 'react';
import { AlertContext } from '../AlertContext';
import { IoAlert, IoClose } from 'react-icons/io5';

const Alert = () => {
    const { alrtMsg, setAlrtMsg } = useContext(AlertContext);

    useEffect(() => {
        if (alrtMsg) {
            const timer = setTimeout(() => {
                setAlrtMsg(null);
            }, 3000);
            return () => clearTimeout(timer); // Cleanup timeout on unmount
        }
    }, [alrtMsg, setAlrtMsg]);

    if (!alrtMsg) return null;

    return (
        <div className=' flex justify-center absolute top-[70px] right-0 z-50'>
            <div className={`w-full text-center p-6 px-16 bg-red-500 border-l-4 border-red-700 relative  text-black animate-slide-in`}>
                <div className='flex items-center text-sm justify-center gap-2 '>
                    {alrtMsg}
                </div>
                <div className='cursor-pointer absolute top-3 right-3'>
                    <IoClose className='text-xl' onClick={() => setAlrtMsg(null)} />
                </div>
            </div>
        </div>
    );
};

export default Alert;

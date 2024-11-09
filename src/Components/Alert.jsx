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
        <div className='w-full flex justify-center sticky top-0 z-50'> 
            <div className="w-full text-center bg-red-800 relative p-6 text-white">
                <div className='flex items-center justify-center gap-2 text-sm'>
                    <IoAlert className='text-xl' />
                    {alrtMsg}
                </div>
                <div className='cursor-pointer absolute top-2 right-2'>
                    <IoClose className='text-xl' onClick={() => setAlrtMsg(null)} />
                </div>
            </div>
        </div>
    );
};

export default Alert;

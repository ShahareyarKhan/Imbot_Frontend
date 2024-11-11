import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []); // Empty array to run only on mount

    const getUser = async () => {
        try {
            const response = await fetch('https://imbot-backend.vercel.app/api/auth/getuser', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data.user);
            setUser(data.user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

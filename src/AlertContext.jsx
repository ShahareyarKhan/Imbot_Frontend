import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alrtMsg, setAlrtMsg] = useState(null); 
    return (
        <AlertContext.Provider value={{ alrtMsg, setAlrtMsg }}>
            {children}
        </AlertContext.Provider>
    );
};

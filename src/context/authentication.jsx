import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const URL_PATH = 'http://localhost:8080';
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        try {
           const res = await axios.post(`${URL_PATH}/api/auth/login`, inputs, {
            withCredentials: true,
        });

        setCurrentUser(res.data) 
        }catch (error){
            console.error("Unable to Login", error);
            throw error;
        }
        
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};
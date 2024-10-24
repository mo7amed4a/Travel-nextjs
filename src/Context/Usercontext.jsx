"use client";
import Cookies from "js-cookie";
import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
    
    const [Authorization, setAuthorization] = useState(Cookies.get("Authorization") || null);
    const [Userdata, setUserdata] = useState(JSON.parse(Cookies.get("Userdata") || null));
    
    return (
        <UserContext.Provider value={{ Authorization, setAuthorization, setUserdata, Userdata}}>
            {children}
        </UserContext.Provider>
    );
}

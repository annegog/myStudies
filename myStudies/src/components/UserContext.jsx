import axios from "axios";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => {},
    ready: false,
});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!user) {
                const response = await axios.get("/student/profile");
                setUser(response.data);
                setReady(true);
                console.log(user);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []); 

    return (
        <UserContext.Provider value={{ user, setUser, ready }}> 
            {children} 
        </UserContext.Provider>
    );
}
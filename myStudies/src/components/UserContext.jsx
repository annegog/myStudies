import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {}, // Add a dummy function to avoid errors
  ready: false,
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
    console.log('user:', user);
    console.log('setUser:', setUser);

  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

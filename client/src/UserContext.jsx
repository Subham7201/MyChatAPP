import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [hasClickedButton, setHasClickedButton] = useState(false);

  useEffect(() => {
    if (hasClickedButton) {
      axios.get('/profile').then(response => {
        setId(response.data.userId);
        setUsername(response.data.username);
      });
    }
  }, [hasClickedButton]);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, setHasClickedButton }}>
      {children}
    </UserContext.Provider>
  );
}

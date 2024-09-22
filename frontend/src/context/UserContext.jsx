import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
    const fetchUser = async () => {
      try {
        
        const res = await axios.get('http://localhost:3000/tokenLogin', { withCredentials: true });
        if (res && res.data && res.data.username) {
          console.log(res.data); 
          setUser(res.data.username); 
        } else {
          console.log('No user data found or token invalid.');
          setUser(null); 
        }
      }
      catch (err) {
        setUser(null);
        console.error(err);
      }
    };


  const logout = async () => {
    setUser(null);
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser, logout ,setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

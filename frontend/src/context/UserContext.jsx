import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/current_user', { withCredentials: true });
        if(res)
          console.log(res.data);
          setUser(res.data.username);
      }
      catch (err) {
        setUser(null);
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    try {
      await axios.post("http://localhost:3000/api/google-login", userData, { withCredentials: true });
    } catch (error) {
      console.error("Error setting user session:", error);
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
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

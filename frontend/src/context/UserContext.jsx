import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [workout,setWorkout]=useState(null);


  
  const fetchUser = async () => {

      // Fetch user data
      const userRes = await axios.get('http://localhost:3000/tokenLogin', { withCredentials: true });
      if (userRes && userRes.data && userRes.data.username) {
        console.log(userRes.data);
        setUser(userRes.data.username);
  
        // Fetch workout data after user is successfully fetched
        const workoutRes = await axios.get('http://localhost:3000/getWorkout', { withCredentials: true });
        console.log(workoutRes.data);
        if (workoutRes && workoutRes.data && workoutRes.data.workout) {
          setWorkout(JSON.parse(workoutRes.data.workout.workoutData));
         
        } else {
          console.log('No workout data found.');
          setWorkout(null); // No workout data
        }
  
      } else {
        console.log('No user data found or token invalid.');
        setUser(null);
        setWorkout(null); // Reset workout data when no user is found
      }
  }
  

  const logout = async () => {
    setUser(null);
    try {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser, logout ,setUser,workout}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

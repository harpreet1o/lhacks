import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
//import { set } from "mongoose";
import logo from "../assets/logo.svg";
import settingsIcon from "../assets/gear.svg";

const Header = () => {
  const navigate = useNavigate(); 
  const { user,setUser } = useContext(UserContext);

  const [btnText, setBtnText] = useState("Login");
  const [btnColor, setBtnColor] = useState("btn-success");

  const handleClick = async () => {
    if (user) {
      await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
      setBtnText("Login");
      setUser(null);
      setBtnColor("btn-success");
    } else {
      navigate('/login');
    }
  };
  const handleNavigation = () => {
    navigate('/setup'); // Use quotes for the path
};
const handleFront = () => {
  navigate('/'); // Use quotes for the path
};

  useEffect(() => {
    if (user) {
      setBtnText("Logout");
      setBtnColor("btn-secondary");
    } else {
      setBtnText("Login");
      setBtnColor("btn-success");
    }
  }, [user]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <a className="px-2" onClick={handleNavigation}> 
          <img src={settingsIcon} alt="Settings icon" className=" img-fluid icon" />
        </a>
        <h1 className="fw-bold text-success" onClick={handleFront}>
          <img src={logo} alt="Running person icon" className="px-2" />
          Easy Fit
        </h1>
        {(user)?<p>Hi, {user}</p>:<></>}
        
        <button className={"btn " + btnColor} onClick={handleClick}>
          {btnText}
        </button>
      </div>
      <div className="bg-success mt-20 p-0 strip"></div>
    </div>

  );
};

export default Header;

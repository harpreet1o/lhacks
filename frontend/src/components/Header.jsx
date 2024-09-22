import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import logo from "../assets/logo.svg";
import settingsIcon from "../assets/gear.svg";
import dumbbellIcon from "../assets/dumbbell.svg";

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
    <div id="header">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="px-2 d-flex">
        <a onClick={() => navigate('/setup')}> 
          <img src={settingsIcon} alt="Settings icon" className=" img-fluid icon" />
        </a>
        <p>&nbsp;&nbsp;</p>
        <a onClick={() => navigate('/workout')}> 
          <img src={dumbbellIcon} alt="Dumbbell icon" className=" img-fluid icon" />
        </a>
        </div>
        <a onClick={() => navigate('/')}>
          <h1 className="fw-bold text-success" >
            <img src={logo} alt="Running person icon" className="px-2" />
            Easy Fit
          </h1>
        </a>
        
        <button className={"btn " + btnColor} onClick={handleClick}>
          {btnText}
        </button>

      </div>

      <div className="bg-success mt-20 p-0 strip"></div>

    </div>

  );
};

export default Header;

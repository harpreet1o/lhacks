import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
//import { set } from "mongoose";
import logo from "../assets/logo.svg";
import settingsIcon from "../assets/gear.svg";

const Header = () => {
  const navigate = useNavigate(); 
  const { user, logout } = useContext(UserContext);

  const [btnText, setBtnText] = useState("Sign Up");
  const [btnColor, setBtnColor] = useState("btn-success");

  const handleClick = () => {
    if (user) {
      logout();
      setBtnText("Sign Up");
      setBtnColor("btn-success");
    } else {
      navigate('/signup');
    }
  };

  useEffect(() => {
    if (user) {
      setBtnText("Sign Out");
      setBtnColor("btn-secondary");
    } else {
      setBtnText("Sign Up");
      setBtnColor("btn-success");
    }
  }, [user]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <a className="px-2" href="/setup"> 
          <img src={settingsIcon} alt="Settings icon" className=" img-fluid icon" />
        </a>
        <h1 className="fw-bold text-success">
          <img src={logo} alt="Running person icon" className="px-2" />
          Easy Fit
        </h1>
        <button className={"btn " + btnColor} onClick={handleClick}>
          {btnText}
        </button>
      </div>
      <div className="bg-success mt-20 p-0 strip"></div>
    </div>

  );
};

export default Header;

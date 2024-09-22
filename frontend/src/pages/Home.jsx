import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';
import './Home.css'; // Adjust the path if necessary

function Home() {

  const navigate = useNavigate(); 

  const { fetchUser,user } = useContext(UserContext);
  useEffect(()=>{
    if(!user)
  fetchUser();
  })

  return (
    <div>
      <Header />
      <div className="intro .filter_green">
      <div className="text-wrap mt-3 w-50 border border-secondary rounded p-3 fs-5 lh-lg bg-gray">
      <em className="text-success fw-bolder">Easy Fit</em> is your personal companion
      Get custom workout plans tailored to your goals and
      schedule, we’ll help you crush your fitness goals!
      <br/>
      Only answer a few quick questions to get started!
      <br/>
      <button 
        className="btn btn-success" onClick={() => navigate('/signup')}     
      >Get started</button> &nbsp;&nbsp;

      <span >to build your perfect workout</span>
      </div>
      </div>
      <Footer />
      </div>
   
    );
}

export default Home;
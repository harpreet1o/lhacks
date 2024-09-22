import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';

function Home() {

  const navigate = useNavigate(); 

  const { fetchUser,user } = useContext(UserContext);
  useEffect(()=>{
    if(!user)
  fetchUser();
  })

  return (
    <div className="intro ">
      <Header />
      
      <div className="text-wrap mt-3 w-50 border border-secondary rounded p-3 fs-5 lh-lg">
      <em className="text-success fw-bolder">Easy Fit</em> is your personal companion
      Get custom workout plans tailored to your goals and
      schedule, we’ll help you crush your fitness goals!
      <br/>
      Only answer a few quick questions to get started!
      <br/>
      <button 
        className="btn btn-success" onClick={navigate('/signup')}     
      >Get started</button> &nbsp;&nbsp;

      <span >to build your perfect workout</span>
      </div>

      <Footer />
    </div>
    );
}

export default Home;
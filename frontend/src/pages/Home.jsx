import Header from "../components/Header";

function Home() {
  return (
    <div className="intro">
      <Header />
      

      <p>Your personal companion</p>
      <p>Get custom workout plans tailored to your goals and</p>
      <p>schedule. Whether you have a few minutes or an </p>
      <p>hour, we’ll help you crush your fitness goals!</p>
      <b></b>
      <p>Answer a few quick questions to get started!</p>

      <button 

        className="btn btn-success btn-lg"

      
      >Get started</button> 

      <span id="to">to build your perfect workout</span>
    </div>
    );
}

export default Home;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Setup from './pages/Setup'
import Workout from './pages/Workout'
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  

  return (
    <>
     
     <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>}/>
        

      </Routes>
    </Router>
    </>
  )
}

export default App

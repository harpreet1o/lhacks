import './App.css'
import Home from './pages/Home'
import Workout from './pages/Workout'
import Setup from './pages/Setup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
    </Router>
  )
}

export default App

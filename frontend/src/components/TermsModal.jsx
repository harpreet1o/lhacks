import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal function
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle when user agrees
  const handleAgree = () => {
    alert('You have agreed to the terms.');
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Welcome to EasyFit</h1>
      <button className="open-modal-btn" onClick={openModal}>
        Read Terms and Conditions
      </button>

      {/* Modal Code */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Terms & Conditions</h2>
            <p>
              By using EasyFit, you agree that you are responsible for your own health. 
              Consult a healthcare provider before starting any workouts. 
              EasyFit is not liable for any injuries or health issues arising from 
              the use of its services.
            </p>
            <div className="modal-actions">
              <button className="agree-btn" onClick={handleAgree}>Agree</button>
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
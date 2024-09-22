import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/signup', formData, { withCredentials: true });
      console.log(res);
      navigate('/login');
      
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <Header />
      <h3 className='text-success mt-4'>Sign up</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={onSubmit} className='fw-semibold'>
        
        <div>
          <label htmlFor="name" className="form-label my-3">Name</label>
          <input type="text" name="name" className="form-control" onChange={onChange} required />
        </div>
        
        <div>
          <label htmlFor="email" className="form-label mt-3">Email</label>
          <input type="email" name="email" className="form-control" onChange={onChange} placeholder='johndoe@gmail.com' required />
        </div>
        
        <div >
          <label htmlFor="password" className="form-label mt-3">Password</label>
          <input type="password" name="password" className="form-control" onChange={onChange} required />
        </div>
        
        <div className='my-3'>
          <a href="/login" className='text-secondary fst-italic'>Already have an account? Login here! </a>
        </div>
        
        <button type="submit" className="btn btn-success ">Sign up</button>
      
      </form>
    </div>
  );
};

export default Signup;
